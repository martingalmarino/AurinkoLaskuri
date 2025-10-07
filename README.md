# AurinkoLaskuri - Solar ROI Calculator for Finland

Una calculadora de ROI solar para Finlandia con programmatic SEO por kunta (municipio), datos en vivo de FMI y Nord Pool, y diseño inspirado en Wise.com y Otovo.fi.

## 🌟 Características

- **Programmatic SEO**: Páginas dinámicas para todos los municipios finlandeses
- **Datos en vivo**: Integración con FMI Open Data WFS API y Nord Pool
- **Cálculo preciso de ROI**: Considera subsidios nacionales y locales
- **FAQ con JSON-LD**: Schema markup para rich results
- **Diseño moderno**: Inspirado en Wise.com y Otovo.fi
- **Responsive**: Optimizado para móviles y escritorio
- **Accesible**: Cumple estándares WCAG AA

## 🚀 Tecnologías

- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Datos**: FMI Open Data WFS API, Nord Pool API
- **Deployment**: Vercel

## 📊 Datos integrados

### FMI (Finnish Meteorological Institute)
- Radiación solar global (RADGLO) por municipio
- Datos anuales y mensuales
- Cache de 24 horas para optimización

### Nord Pool
- Precios de electricidad en tiempo real
- Fallback a ENTSO-E si Nord Pool no está disponible
- Cache de 6 horas

### Subsidios
- Valtion tuki (30% nacional)
- Paikalliset tuet (8-20% según municipio)
- Dataset manual para MVP

## 🏗️ Estructura del proyecto

```
├── app/
│   ├── fi/aurinkopaneelit-laskuri/[kunta]/  # Páginas dinámicas por kunta
│   ├── globals.css                          # Estilos globales
│   ├── layout.tsx                           # Layout principal
│   ├── page.tsx                             # Página de inicio
│   └── not-found.tsx                        # 404 page
├── components/
│   ├── CalculatorCard.tsx                   # Componente principal del calculador
│   ├── FAQAccordion.tsx                     # FAQ expandible
│   ├── FeatureStrip.tsx                     # Sección de características
│   ├── Footer.tsx                           # Pie de página
│   ├── Header.tsx                           # Encabezado
│   ├── Hero.tsx                             # Sección hero
│   └── LocalInstallers.tsx                  # Lista de instaladores locales
├── lib/
│   ├── faqJsonLd.ts                         # Generador de FAQ JSON-LD
│   ├── fmiClient.ts                         # Cliente FMI API
│   ├── kunnatFI.ts                          # Dataset de municipios
│   ├── nordPoolClient.ts                    # Cliente Nord Pool API
│   ├── roiSolarFI.ts                        # Lógica de cálculo ROI
│   └── types.ts                             # Definiciones de tipos
└── ...
```

## 🧮 Cálculo de ROI

### Entradas
- Tamaño del sistema (kWp) o área del techo (m²)
- Costo de instalación
- Eficiencia de paneles (18-20% por defecto)
- Radiación solar promedio de FMI
- Precio de electricidad de Nord Pool
- Tasa de subsidio local

### Fórmulas
```typescript
// Producción anual de energía
annualEnergyProduction = RADGLO * panelArea * efficiency

// Ahorros anuales
annualSavings = annualEnergyProduction * electricityPrice

// Subsidios totales
totalSubsidy = installationCost * (nationalRate + localRate)

// Costo neto de instalación
netInstallationCost = installationCost - totalSubsidy

// ROI en años
roiYears = netInstallationCost / annualSavings
```

## 🎨 Diseño

### Paleta de colores
- **Primario**: Azul (#1E40AF)
- **Éxito**: Verde (#16A34A)
- **Solar**: Verde pastel (#F0F7F4)
- **Tipografía**: Inter

### Componentes principales
- **Hero**: Fondo degradado pastel verde-azul
- **Calculadora**: Tarjeta centrada, max-w 720px, sombra sutil
- **Botones**: Azul primario con hover más oscuro
- **Inputs**: Altura h-12, etiquetas arriba, texto de ayuda

## 📱 Responsive Design

- **Mobile-first**: Diseño optimizado para móviles
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid**: CSS Grid y Flexbox para layouts adaptativos
- **Tipografía**: Escalas responsive con clamp()

## 🔍 SEO

### Programmatic SEO
- Páginas estáticas para todos los municipios
- `getStaticPaths` y `getStaticProps`
- Meta tags dinámicos por kunta
- URLs amigables: `/fi/aurinkopaneelit-laskuri/[kunta]`

### Schema Markup
- FAQ JSON-LD por municipio
- Datos estructurados para rich results
- Breadcrumbs para navegación

### Performance
- Static Site Generation (SSG)
- Image optimization
- Code splitting automático
- Cache de datos externos

## 🚀 Deployment

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Variables de entorno
```env
NEXT_PUBLIC_FMI_API_URL=https://opendata.fmi.fi/wfs
NEXT_PUBLIC_NORDPOOL_API_URL=https://www.nordpoolgroup.com/api
NEXT_PUBLIC_SITE_URL=https://aurinkolaskuri.fi
```

## 🛠️ Desarrollo

### Instalación
```bash
npm install
npm run dev
```

### Scripts disponibles
```bash
npm run dev      # Desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linting
```

### Estructura de datos

#### KuntaData
```typescript
interface KuntaData {
  name: string;           // "Helsinki"
  slug: string;          // "helsinki"
  fmiStation: string;    // "Helsinki"
  latitude: number;      // 60.1699
  longitude: number;     // 24.9384
  population: number;    // 656920
  region: string;        // "Uusimaa"
  subsidy: SubsidyData;  // Nacional + local
}
```

#### ROICalculationResult
```typescript
interface ROICalculationResult {
  annualEnergyProduction: number;  // kWh/año
  annualSavings: number;          // €/año
  totalSubsidy: number;           // €
  netInstallationCost: number;    // €
  roiYears: number;              // años
  totalSavings20Years: number;   // €
  breakEvenYear: number;         // año
}
```

## 📈 Métricas y Analytics

### Datos a rastrear
- Cálculos realizados por municipio
- Tiempo en página
- Tasa de conversión (clicks en instaladores)
- Errores de API

### Herramientas recomendadas
- Google Analytics 4
- Vercel Analytics
- Hotjar para UX insights

## 🔮 Roadmap

### MVP (Completado)
- [x] Estructura básica del proyecto
- [x] Integración FMI API
- [x] Integración Nord Pool API
- [x] Cálculo de ROI
- [x] Páginas dinámicas por kunta
- [x] FAQ con JSON-LD
- [x] Diseño responsive

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
- [ ] Integración con más fuentes de datos
- [ ] Sistema de reviews de instaladores

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

- **Website**: https://aurinkolaskuri.fi
- **Email**: info@aurinkolaskuri.fi
- **Twitter**: @aurinkolaskuri

---

Hecho con ❤️ para la transición energética de Finlandia 🇫🇮
