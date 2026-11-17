import type { Register } from 'claude-code'

const compact = (n: number): string =>
  n >= 1e6 ? `${(n / 1e6).toFixed(2)}M`
  : n >= 1e3 ? `${(n / 1e3).toFixed(1)}k`
  : `${n}`

// `spend_limit` lo reporta un gateway Claude, no la suscripción.
const LABELS: Record<string, string> = { five_hour: '5h', seven_day: '7d', spend_limit: 'gasto' }

const tone = (percent: number): string =>
  percent >= 90 ? '#ff5555' : percent >= 75 ? '#eab308' : '#a3a3a3'

export const register: Register = on => {
  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const { context, cost, rateLimits } = await $.session.usage()
    const { Box, Text } = $.ui.resolve(e)

    const parts: any[] = []

    if (context.tokens !== undefined) {
      parts.push(
        <Text key="tokens">
          <Text color="#a3a3a3">{compact(context.tokens)}</Text>
          <Text dimColor> tok</Text>
        </Text>,
      )
    }

    // `cost.usd` es un estimado local (lo que totalea /cost), no la factura.
    if (cost) {
      parts.push(
        <Text key="cost">
          <Text color="#a3a3a3">~${cost.usd.toFixed(2)}</Text>
          <Text dimColor> est</Text>
        </Text>,
      )
    }

    for (const limit of rateLimits) {
      parts.push(
        <Text key={limit.kind}>
          <Text dimColor>{LABELS[limit.kind] ?? limit.kind} </Text>
          <Text color={tone(limit.percentUsed)}>{limit.percentUsed}%</Text>
        </Text>,
      )
    }

    return (
      <Box width={e.props.bodyColumns} gap={2}>
        {parts.length ? parts : <Text dimColor>—</Text>}
      </Box>
    )
  })
}
