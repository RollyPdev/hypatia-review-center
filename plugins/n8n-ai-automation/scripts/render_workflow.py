#!/usr/bin/env python3
"""Render an n8n starter workflow from a JSON template."""

from __future__ import annotations

import argparse
import json
import uuid
from pathlib import Path
from typing import Any


def default_template_path() -> Path:
    return Path(__file__).resolve().parents[1] / "assets" / "webhook-ai-agent-template.json"


def replace_tokens(value: Any, tokens: dict[str, str]) -> Any:
    if isinstance(value, str):
        for token, replacement in tokens.items():
            value = value.replace(token, replacement)
        return value
    if isinstance(value, list):
        return [replace_tokens(item, tokens) for item in value]
    if isinstance(value, dict):
        return {key: replace_tokens(item, tokens) for key, item in value.items()}
    return value


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Render the n8n webhook AI agent workflow template."
    )
    parser.add_argument("--template", type=Path, default=default_template_path())
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--name", default="AI Automation Agent")
    parser.add_argument("--webhook-path", default="ai-automation")
    parser.add_argument(
        "--system-prompt",
        default=(
            "You are an internal AI automation agent. Answer with concise, "
            "actionable JSON and ask for clarification when the request is unsafe or incomplete."
        ),
    )
    parser.add_argument("--openai-model", default="REPLACE_WITH_MODEL_NAME")
    parser.add_argument("--openai-credential-id", default="REPLACE_WITH_OPENAI_CREDENTIAL_ID")
    parser.add_argument("--openai-credential-name", default="OpenAI account")
    parser.add_argument("--webhook-id", default="")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    workflow = json.loads(args.template.read_text(encoding="utf-8"))
    webhook_id = args.webhook_id or uuid.uuid4().hex

    rendered = replace_tokens(
        workflow,
        {
            "{{WORKFLOW_NAME}}": args.name,
            "{{WEBHOOK_PATH}}": args.webhook_path,
            "{{WEBHOOK_ID}}": webhook_id,
            "{{SYSTEM_PROMPT}}": args.system_prompt,
            "{{OPENAI_MODEL}}": args.openai_model,
            "{{OPENAI_CREDENTIAL_ID}}": args.openai_credential_id,
            "{{OPENAI_CREDENTIAL_NAME}}": args.openai_credential_name,
        },
    )

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(rendered, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote n8n workflow: {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
