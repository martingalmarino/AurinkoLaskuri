# 🚀 Instrucciones de Instalación y Ejecución

## Requisitos previos

- Node.js 18+ 
- npm o yarn
- Git

## Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   cd "Solar ROI Finlandia"
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 🎯 Páginas principales

- **Página de inicio**: http://localhost:3000
- **Laskuri Helsinki**: http://localhost:3000/fi/aurinkopaneelit-laskuri/helsinki
- **Laskuri Tampere**: http://localhost:3000/fi/aurinkopaneelit-laskuri/tampere
- **Laskuri Oulu**: http://localhost:3000/fi/aurinkopaneelit-laskuri/oulu

## 🛠️ Scripts disponibles

```bash
npm run dev      # Desarrollo (puerto 3000)
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Verificar errores de código
```

## 📊 Funcionalidades implementadas

### ✅ Completado
- [x] Estructura del proyecto Next.js 14
- [x] Cliente FMI para datos de radiación solar
- [x] Cliente Nord Pool para precios de electricidad
- [x] Lógica de cálculo de ROI solar
- [x] Dataset de 20 municipios finlandeses
- [x] FAQ con JSON-LD schema
- [x] Componentes UI con diseño Wise/Otovo
- [x] Páginas dinámicas por kunta (programmatic SEO)
- [x] Diseño responsive y accesible
- [x] API endpoint para cálculos

### 🎨 Diseño
- **Inspiración**: Wise.com + Otovo.fi
- **Colores**: Azul primario (#1E40AF), verde éxito (#16A34A)
- **Tipografía**: Inter
- **Layout**: Mobile-first, responsive

### 🌐 SEO
- **Programmatic SEO**: Páginas para cada kunta
- **Schema markup**: FAQ JSON-LD
- **Meta tags**: Dinámicos por kunta
- **Sitemap**: Incluido en /public/sitemap.xml

### 📱 Responsive
- **Mobile**: Optimizado para móviles
- **Tablet**: Grid adaptativo
- **Desktop**: Layout completo

## 🔧 Configuración de APIs

### FMI API
- **Endpoint**: https://opendata.fmi.fi/wfs
- **Cache**: 24 horas
- **Fallback**: Datos por defecto si falla

### Nord Pool API
- **Endpoint**: https://www.nordpoolgroup.com/api
- **Cache**: 6 horas
- **Fallback**: ENTSO-E API

## 🚀 Deployment

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Variables de entorno opcionales
```env
NEXT_PUBLIC_FMI_API_URL=https://opendata.fmi.fi/wfs
NEXT_PUBLIC_NORDPOOL_API_URL=https://www.nordpoolgroup.com/api
NEXT_PUBLIC_SITE_URL=https://aurinkolaskuri.fi
```

## 📈 Estructura de datos

### Municipios (Kunnat)
```typescript
{
  name: "Helsinki",
  slug: "helsinki", 
  fmiStation: "Helsinki",
  latitude: 60.1699,
  longitude: 24.9384,
  population: 656920,
  region: "Uusimaa",
  subsidy: {
    national: { rate: 0.30 },
    local: { rate: 0.20 }
  }
}
```

### Cálculo ROI
```typescript
{
  annualEnergyProduction: 4500, // kWh/año
  annualSavings: 675,          // €/año  
  totalSubsidy: 3750,          // €
  netInstallationCost: 3750,   // €
  roiYears: 5.6,              // años
  totalSavings20Years: 8750,   // €
  breakEvenYear: 5.6           // año
}
```

## 🎯 Próximos pasos

### Fase 2
- [ ] Sistema de autenticación
- [ ] Guardar cálculos del usuario
- [ ] Comparación entre municipios
- [ ] Gráficos de producción mensual
- [ ] Integración con instaladores reales

### Fase 3
- [ ] App móvil (React Native)
- [ ] API pública
- [ ] Widget embebible
- [ ] Más fuentes de datos

## 🐛 Troubleshooting

### Error: Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: API timeout
- Verificar conexión a internet
- APIs externas pueden estar temporalmente no disponibles
- El sistema usa fallbacks automáticos

### Error: Build failed
```bash
npm run lint
# Corregir errores mostrados
npm run build
```

## 📞 Soporte

Si encuentras problemas:
1. Verifica que Node.js sea versión 18+
2. Ejecuta `npm install` nuevamente
3. Verifica que el puerto 3000 esté libre
4. Revisa la consola del navegador para errores

---

¡El proyecto está listo para usar! 🎉
