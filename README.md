# token-burn

Mod de Claude Code: una línea sobre el prompt con lo que vas quemando en la sesión.

```
38.4k tok   ~$0.42 est   5h 23%   7d 41%
```

- **tokens** — input de la última respuesta contra la ventana del modelo (`context.tokens`).
- **costo** — estimado local de la sesión, lo que totaliza `/cost`. **No es la factura**;
  en suscripción dentro del plan no hay cargo y la cifra va igual.
- **ventanas** — `rateLimits` del último response: `5h`, `7d` y el `spend_limit` de un gateway.
  El porcentaje es lo usado, no lo que queda.

## Instalación

Copia la carpeta en `~/.claude/mods/token-burn` (Windows: `%USERPROFILE%\.claude\mods\token-burn`)
y reinicia Claude Code.

## Notas

- `.claude-plugin/types/` no se versiona: el motor escribe ahí las declaraciones TypeScript
  en cada carga, según tu versión. `tsconfig.json` las extiende desde esa ruta.
- Todo vive en `hooks/register.tsx` (hook `ui.render` → `AbovePrompt`).
- Convive con el mod `context-meter`: ese muestra el % del contexto, este los tokens y el gasto.
