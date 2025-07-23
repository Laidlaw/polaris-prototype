# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Development server:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Lint code:**
```bash
npm run lint
```

**Preview production build:**
```bash
npm run preview
```

## Project Architecture

This is a React-based B2B electronics marketplace application called "Vellum" built with:

- **React 18** with Vite as the build tool
- **Shopify Polaris** as the UI component library and design system
- **React Router DOM** for client-side routing
- **JSON data files** for mock product/content data

### Application Structure

**Single Page Application (SPA)** - The app uses a screen-based routing system with these main screens:
- `home` - Product categories and featured products
- `products` - Product catalog grid
- `product-detail` - Individual product details with volume pricing
- `quote-builder` - B2B quote request form
- `business-app` - Business account application
- `quotes` - Quote management
- `orders` - Order history

**Key Components:**
- `src/App.jsx` - Main application container with screen routing, header, sidebar navigation
- `src/components/HomeScreen.jsx` - Standalone home screen component (appears to be legacy/unused)
- `src/components/polaris_product_components.js` - Sample Polaris components (development reference)

**Data Layer:**
- `src/data/products_data.json` - Product catalog with detailed specifications, pricing tiers, reviews
- `src/data/categories_data.json` - Product categories with icons and descriptions  
- `src/data/site_content.json` - Site branding and content
- `src/assets/product_images/` - Product image assets organized by product ID

### State Management

The application uses React's built-in state management with useState hooks in the main App component:
- Screen routing state (`currentScreen`)
- Selected product state (`selectedProductId`) 
- Form states for quotes and business applications
- UI state (sidebar, user menu, search)

### Shopify Polaris Integration

The app is wrapped in Polaris AppProvider with custom theme configuration. All UI components use Polaris design tokens and components for consistency with Shopify's design system.

### Notable Patterns

- **Screen-based routing** - Uses a switch statement to render different screen components
- **Responsive design** - Grid components with responsive column spans
- **Volume pricing** - Products have tiered pricing structures for B2B customers
- **Form handling** - Multiple form states for business applications and quote requests
- **Mock data driven** - Product catalog, categories, and content loaded from JSON files

The codebase follows modern React patterns with functional components, hooks, and Polaris design system conventions.