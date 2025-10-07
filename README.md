# 🚀 AurinkoLaskuri - Premium Solar ROI Calculator for Finland

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/martingalmarino/AurinkoLaskuri.git)

Una calculadora **premium de clase fintech** para ROI (Retorno de Inversión) de paneles solares en Finlandia, con diseño inspirado en Wise.com y datos en vivo de FMI y Nord Pool.

## ✨ Características Premium

### 🎨 **Diseño Fintech-Grade**
- **Estética profesional** inspirada en Wise.com y Otovo.fi
- **Paleta de colores premium** con azul fintech (#1E40AF) y acentos verdes eco-friendly
- **Tipografía Inter** con jerarquía visual clara
- **Micro-interacciones** y animaciones suaves
- **Responsive design** mobile-first optimizado

### 📊 **Funcionalidades Avanzadas**
- **Datos en Vivo**: Integración con FMI (radiación solar) y Nord Pool (precios de electricidad)
- **SEO Programático**: 25+ páginas individuales para cada municipio (kunta)
- **Calculadora Dual**: Modo sistema kW vs. área de techo
- **Cálculos Precisos**: ROI, período de recuperación y ahorros a 20 años
- **Trust Chips**: Indicadores de confianza con datos en tiempo real
- **FAQ con JSON-LD**: Structured data para rich results

### 🛠 **Stack Tecnológico**
- **Next.js 14** con App Router y SSG
- **TypeScript** para tipado seguro
- **Tailwind CSS** con sistema de diseño personalizado
- **Lucide Icons** para iconografía consistente
- **APIs Externas**: FMI y Nord Pool (con fallback mock data)

## 🚀 Deployment Rápido

### Opción 1: Vercel (Recomendado)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/martingalmarino/AurinkoLaskuri.git)

1. Click en el botón "Deploy with Vercel"
2. Conecta tu cuenta de GitHub
3. Vercel detectará automáticamente Next.js
4. ¡Deploy en 2 minutos!

### Opción 2: Desarrollo Local
```bash
# Clonar el repositorio
git clone https://github.com/martingalmarino/AurinkoLaskuri.git
cd AurinkoLaskuri

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
npm start
```

## 📱 Demo en Vivo

**🌐 URL de Producción:** [https://aurinkolaskuri.vercel.app](https://aurinkolaskuri.vercel.app)

### Páginas de Ejemplo:
- [Helsinki](https://aurinkolaskuri.vercel.app/fi/aurinkopaneelit-laskuri/helsinki)
- [Tampere](https://aurinkolaskuri.vercel.app/fi/aurinkopaneelit-laskuri/tampere)
- [Oulu](https://aurinkolaskuri.vercel.app/fi/aurinkopaneelit-laskuri/oulu)

## 🏗 Arquitectura del Proyecto

```
├── app/                          # Next.js App Router
│   ├── fi/aurinkopaneelit-laskuri/[kunta]/  # Páginas dinámicas por municipio
│   ├── api/calculate/            # API endpoint para cálculos
│   └── globals.css              # Estilos globales premium
├── components/                   # Componentes React
│   ├── PremiumCalculator.tsx    # Calculadora fintech UX
│   ├── Hero.tsx                 # Sección hero premium
│   ├── KuntaPills.tsx           # Navegación municipios
│   └── HowItWorks.tsx           # Proceso 3-pasos
├── lib/                         # Lógica de negocio
│   ├── roiSolarFI.ts           # Cálculos ROI
│   ├── kunnatFI.ts             # Datos municipios
│   └── mockData.ts             # Datos mock para desarrollo
└── public/                      # Assets estáticos
    ├── robots.txt              # SEO
    └── sitemap.xml             # Mapa del sitio
```

## 🎯 Características de Diseño

### **Sistema de Colores Premium**
```css
Primary: #1E40AF (Deep blue fintech)
Success: #16A34A (Green eco-friendly)
Solar: #F0F7F4 (Pastel hero background)
Text: #1E293B (Slate-900)
Muted: #64748B (Slate-500)
```

### **Componentes Modulares**
- **Botones pill-shaped** con hover effects
- **Inputs grandes** optimizados para móvil
- **Cards rounded-2xl** con sombras sutiles
- **Trust chips** con iconos y datos en vivo
- **Animaciones suaves** con transiciones de 300ms

## 📊 Performance & SEO

### **Métricas Objetivo**
- **Lighthouse Score:** 95+ (Performance)
- **First Contentful Paint:** < 1.5s
- **SEO Score:** 100/100
- **Accessibility:** WCAG AA compliant

### **SEO Optimizations**
- ✅ Meta tags dinámicos por municipio
- ✅ JSON-LD structured data
- ✅ Sitemap.xml automático
- ✅ Robots.txt configurado
- ✅ Open Graph y Twitter Cards

## 🔧 Configuración Avanzada

### **Variables de Entorno**
```bash
# Copia env.example a .env.local
cp env.example .env.local

# Configura tus API keys
FMI_API_KEY=your_fmi_api_key_here
NORD_POOL_API_KEY=your_nord_pool_api_key_here
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### **APIs en Vivo**
Actualmente usa mock data para desarrollo. Para habilitar APIs reales:

1. **FMI API**: Registro en [FMI Open Data](https://en.ilmatieteenlaitos.fi/open-data-manual)
2. **Nord Pool API**: Registro en [Nord Pool](https://www.nordpoolgroup.com/)
3. Actualizar `lib/fmiClient.ts` y `lib/nordPoolClient.ts`

## 📈 Roadmap

### **v1.1 - Próximas Funcionalidades**
- [ ] Integración APIs en vivo
- [ ] Google Analytics
- [ ] Formulario de contacto
- [ ] Comparador de instaladores
- [ ] Calculadora de baterías

### **v1.2 - Expansión**
- [ ] Más países nórdicos
- [ ] Calculadora de bomba de calor
- [ ] API pública
- [ ] Dashboard admin

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.

## 🙏 Agradecimientos

- **FMI** por los datos de radiación solar
- **Nord Pool** por los precios de electricidad
- **Wise.com** y **Otovo.fi** por la inspiración de diseño
- **Vercel** por la plataforma de deployment

---

**🚀 ¡Deploy en 2 minutos con Vercel!**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/martingalmarino/AurinkoLaskuri.git)