---
name: n8n-ai-automation
description: Design, review, and generate n8n workflow JSON for AI automations, agents, webhook flows, approvals, and integration-heavy workflows.
---

# n8n AI Automation

Use this skill when the user wants to create, modify, review, or export an n8n workflow that includes AI, agents, model calls, webhooks, approvals, or external integrations.

## Workflow

1. Clarify the automation shape only when it affects safety or correctness: trigger, input payload, target action, human approval needs, model/provider, and destination systems.
2. Draft the workflow as named n8n nodes before writing JSON: trigger, normalization, AI step, tools/integrations, guardrails, error handling, response, and logging.
3. Keep secrets out of workflow JSON. Use n8n credentials and environment variables instead of hardcoded API keys.
4. Prefer built-in n8n nodes over Code nodes. Use Code nodes only when transformation logic cannot be represented cleanly with standard nodes.
5. Add failure paths for external APIs, empty AI output, malformed input, and rate-limit responses.
6. For automations that create, delete, publish, charge, email, message customers, or update records at scale, include an approval gate unless the user explicitly says it is safe to run unattended.
7. Return import steps, required credentials, activation notes, and a quick test payload.

## AI Agent Defaults

- Put the role, constraints, output shape, and refusal boundaries in the system prompt.
- Ask for structured JSON output when downstream nodes depend on specific fields.
- Validate or parse AI output before sending it to business-critical nodes.
- Include a clear fallback path when the model cannot answer confidently.
- Log enough context to debug the execution without storing unnecessary sensitive data.

## Starter Template

Use `assets/webhook-ai-agent-template.json` for a basic webhook-to-AI-agent workflow. To render a copy:

```bash
python3 plugins/n8n-ai-automation/scripts/render_workflow.py \
  --output /tmp/n8n-ai-agent.json \
  --name "AI Intake Agent" \
  --webhook-path "ai-intake" \
  --system-prompt "Classify the request and return concise next steps."
```

After import, map the OpenAI Chat Model node to the correct n8n credential and run a manual webhook test before activation.
