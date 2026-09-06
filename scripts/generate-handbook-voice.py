#!/usr/bin/env python3
"""Generate the approved handbook narration pages with MiniMax T2A.

The API key is read from MINIMAX_API_KEY or macOS Keychain and is never stored.
"""

from __future__ import annotations

import json
import os
import ssl
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

import certifi


ROOT = Path(__file__).resolve().parent.parent
VOICE_DIR = ROOT / "voice"
OUT_DIR = ROOT / "assets" / "audio"
API_URL = "https://api.minimax.io/v1/t2a_v2"


def read_key() -> str:
    value = os.environ.get("MINIMAX_API_KEY", "").strip()
    if value:
        return value
    result = subprocess.run(
        [
            "security",
            "find-generic-password",
            "-s",
            "minimax-api-key",
            "-a",
            "evafu",
            "-w",
        ],
        check=False,
        capture_output=True,
        text=True,
    )
    return result.stdout.strip() if result.returncode == 0 else ""


def synthesize(api_key: str, text: str, out_path: Path) -> None:
    payload = {
        "model": os.environ.get("MINIMAX_MODEL", "speech-2.8-hd"),
        "text": text,
        "stream": False,
        "language_boost": "Chinese",
        "subtitle_enable": False,
        "voice_setting": {
            "voice_id": os.environ.get(
                "MINIMAX_VOICE_ID", "Chinese (Mandarin)_Straightforward_Boy"
            ),
            "speed": 1.04,
            "vol": 1.0,
            "pitch": 1,
            "emotion": "neutral",
        },
        "audio_setting": {
            "sample_rate": 32000,
            "bitrate": 128000,
            "format": "mp3",
            "channel": 1,
        },
    }
    request = urllib.request.Request(
        API_URL,
        data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    context = ssl.create_default_context(cafile=certifi.where())
    try:
        with urllib.request.urlopen(request, timeout=120, context=context) as response:
            body = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        message = error.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"MiniMax request failed: HTTP {error.code} {message[:500]}") from error
    status_code = body.get("base_resp", {}).get("status_code")
    if status_code not in (0, None):
        status_message = body.get("base_resp", {}).get("status_msg", "")
        raise RuntimeError(f"MiniMax returned status {status_code}: {status_message}")
    audio_hex = (body.get("data") or {}).get("audio")
    if not audio_hex:
        raise RuntimeError("MiniMax response did not include audio data")
    out_path.write_bytes(bytes.fromhex(audio_hex))


def main() -> int:
    api_key = read_key()
    if not api_key:
        print("MiniMax API key is unavailable.", file=sys.stderr)
        return 2
    requested = sys.argv[1:]
    sources = (
        [VOICE_DIR / (name if name.endswith(".txt") else f"{name}.txt") for name in requested]
        if requested
        else sorted(VOICE_DIR.glob("*.txt"))
    )
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for source in sources:
        if not source.exists():
            print(f"Missing narration source: {source.name}", file=sys.stderr)
            return 2
        target = OUT_DIR / f"{source.stem}.mp3"
        synthesize(api_key, source.read_text(encoding="utf-8").strip(), target)
        print(f"Wrote {target.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
