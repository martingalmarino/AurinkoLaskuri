# API Integration Guide

Este documento explica cómo funciona la integración con las APIs reales de FMI y Nord Pool en el proyecto AurinkoLaskuri.

## Configuración

### Variables de Entorno

Crea un archivo `.env.local` basado en `env.example`:

```bash
# Configuración de fuentes de datos
USE_REAL_APIS=true  # true para APIs reales, false para mock data

# APIs opcionales (con fallbacks integrados)
FMI_API_KEY=your_fmi_api_key_here
NORD_POOL_API_KEY=your_nord_pool_api_key_here
```

### Modos de Operación

1. **Desarrollo (Mock Data)**: `USE_REAL_APIS=false`
   - Usa datos simulados para desarrollo rápido
   - No requiere conexión a internet
   - Ideal para testing y desarrollo

2. **Producción (Real APIs)**: `USE_REAL_APIS=true`
   - Conecta con APIs reales de FMI y Nord Pool
   - Incluye fallbacks automáticos a mock data si las APIs fallan
   - Ideal para producción

## APIs Integradas

### FMI (Finnish Meteorological Institute)
- **Endpoint**: `https://opendata.fmi.fi/wfs`
- **Datos**: Radiación solar anual y mensual (RADGLO)
- **Cache**: 24 horas
- **Fallback**: Datos promedio de Finlandia

### Nord Pool
- **Endpoint**: `https://www.nordpoolgroup.com/api/marketdata/page/10`
- **Datos**: Precios de electricidad en tiempo real
- **Cache**: 6 horas
- **Fallback**: Precio promedio de Finlandia (0.15 €/kWh)

### ENTSO-E (Alternativa)
- **Endpoint**: `https://web-api.tp.entsoe.eu/api`
- **Datos**: Precios de electricidad del mercado europeo
- **Uso**: Fallback si Nord Pool falla

## Componentes del Sistema

### DataService (`lib/dataService.ts`)
Servicio singleton que maneja la lógica de datos:

```typescript
import { dataService } from '@/lib/dataService';

// Obtener datos de radiación solar
const solarData = await dataService.getSolarRadiation('Helsinki-Vantaa');

// Obtener precio de electricidad
const priceData = await dataService.getElectricityPrice();

// Verificar estado de APIs
const health = await dataService.healthCheck();
```

### APIs REST

#### `/api/health`
Verifica el estado de las APIs:
```bash
GET /api/health
```

Respuesta:
```json
{
  "status": "ok",
  "timestamp": "2025-01-27T10:00:00.000Z",
  "fmiAPI": true,
  "nordPoolAPI": true,
  "mode": "real"
}
```

#### `/api/data-mode`
Controla el modo de datos:
```bash
GET /api/data-mode
POST /api/data-mode
```

## Uso en Producción

### Vercel Deployment

1. Configura las variables de entorno en Vercel:
   ```bash
   USE_REAL_APIS=true
   ```

2. Las APIs se habilitan automáticamente en producción

3. El sistema incluye fallbacks automáticos si las APIs fallan

### Monitoreo

- Usa `/api/health` para verificar el estado de las APIs
- Los logs incluyen información sobre fallbacks
- El sistema es resiliente y funciona incluso si las APIs fallan

## Desarrollo

### Toggle de Modo de Datos

En desarrollo, aparece un toggle en la esquina inferior derecha que permite:
- Cambiar entre modo real y mock
- Verificar el estado de las APIs
- Refrescar el estado de conexión

### Testing

```bash
# Verificar APIs reales
curl http://localhost:3000/api/health

# Cambiar a modo real
curl -X POST http://localhost:3000/api/data-mode \
  -H "Content-Type: application/json" \
  -d '{"useRealAPIs": true}'
```

## Fallbacks y Resilencia

El sistema está diseñado para ser resiliente:

1. **Cache inteligente**: Los datos se cachean para reducir llamadas a APIs
2. **Fallbacks automáticos**: Si una API falla, usa datos simulados
3. **Múltiples fuentes**: Nord Pool tiene fallback a ENTSO-E
4. **Datos realistas**: Los mock data están basados en datos reales de Finlandia

## Troubleshooting

### APIs no funcionan
1. Verifica `/api/health`
2. Revisa los logs del servidor
3. El sistema automáticamente usa fallbacks

### Datos incorrectos
1. Verifica que las estaciones FMI sean correctas
2. Los datos de Nord Pool pueden tener variaciones
3. Los mock data son promedios realistas

### Performance
1. El cache reduce las llamadas a APIs
2. Los datos se obtienen en paralelo cuando es posible
3. Los timeouts están configurados apropiadamente
