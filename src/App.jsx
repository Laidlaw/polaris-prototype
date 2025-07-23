import React, { useState, useCallback, useEffect } from 'react';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';

// Screen Components
import HomeScreen from './components/screens/HomeScreen';
import ProductDetailScreen from './components/screens/ProductDetailScreen';
import CategoryProductsScreen from './components/screens/CategoryProductsScreen';

// Data imports
import categoriesData from './data/categories_data.json';
import productsData from './data/products_data.json';
import siteContent from './data/site_content.json';
import constructionData from './data/construction_products.json';
import constructionSafetyShirts from './data/construction_safety_shirts.json';
import safetyProducts from './data/safety_products.json';

// Legacy screens (to be refactored later)
import {
  Page,
  Card,
  Layout,
  Button,
  ButtonGroup,
  TextField,
  Select,
  Grid,
  Badge,
  Banner,
  Box,
  Divider,
  Text,
  ResourceList,
  ResourceItem,
  FormLayout,
  DataTable,
  Tabs,
  InlineStack,
  BlockStack,
  Icon,
  Thumbnail,
  ActionList,
  Popover,
  Avatar
} from '@shopify/polaris';
import {
  HomeIcon,
  ProductIcon,
  NoteIcon,
  OrderIcon,
  PersonIcon,
  SearchIcon,
  MenuIcon,
  ChevronDownIcon
} from '@shopify/polaris-icons';

const VellumApp = () => {
  // Core state
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Persona state
  const [currentPersona, setCurrentPersona] = useState('shopper'); // 'shopper' or 'manager'

  // Shopping cart state
  const [cartItems, setCartItems] = useState([]);
  
  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Form states
  const [quoteQuantity, setQuoteQuantity] = useState('25');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Consolidated product data
  const allProductsData = {
    safetyProducts,
    constructionSafetyShirts,
    constructionData,
    productsData
  };

  // Persona helpers
  const togglePersona = useCallback(() => {
    setCurrentPersona(prev => prev === 'shopper' ? 'manager' : 'shopper');
  }, []);

  // Shopping cart helpers
  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  }, []);

  const updateCartQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== productId));
    } else {
      setCartItems(prev => 
        prev.map(item => 
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  // Navigation helpers
  const handleNavigate = useCallback((screen, options = {}) => {
    setCurrentScreen(screen);
    if (options.categoryId) {
      setSelectedCategoryId(options.categoryId);
    }
  }, []);

  const handleProductClick = useCallback((productId) => {
    setSelectedProductId(productId);
    setCurrentScreen('product-detail');
  }, []);

  // Keyboard shortcut for persona switching
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
        event.preventDefault();
        togglePersona();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePersona]);

  // Legacy data setup
  const { categories } = categoriesData;
  const { products } = productsData;
  const selectedProduct = products.find(p => p.id === selectedProductId);

  // Header navigation component with persona awareness
  const HeaderComponent = () => (
    <div style={{
      background: 'white',
      borderBottom: '1px solid #e1e1e1',
      padding: '12px 24px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div 
            onClick={() => setCurrentScreen('home')} 
            style={{ cursor: 'pointer' }}
          >
            <Text variant="headingLg" as="h1">{siteContent.brandName}</Text>
          </div>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <Button variant="tertiary" onClick={() => setCurrentScreen('home')} icon={HomeIcon}>
              Home
            </Button>
            <Button variant="tertiary" onClick={() => setCurrentScreen('products')} icon={ProductIcon}>
              Products  
            </Button>
            <Button variant="tertiary" onClick={() => setCurrentScreen('quotes')} icon={NoteIcon}>
              Quotes
            </Button>
            <Button variant="tertiary" onClick={() => setCurrentScreen('orders')} icon={OrderIcon}>
              Orders
            </Button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Persona Indicator */}
          <Badge 
            tone={currentPersona === 'shopper' ? 'info' : 'success'}
            size="medium"
          >
            {currentPersona === 'shopper' ? '🛒 Shopper' : '💼 Manager'}
          </Badge>
          
          {/* Cart Items Count */}
          {cartItems.length > 0 && (
            <Button 
              variant="tertiary" 
              onClick={() => setCurrentScreen('quotes')}
            >
              Cart ({cartItems.length})
            </Button>
          )}

          <div style={{ position: 'relative' }}>
            <Popover
              active={userMenuOpen}
              activator={
                <Button
                  variant="tertiary"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  icon={PersonIcon}
                >
                  Account
                </Button>
              }
              onClose={() => setUserMenuOpen(false)}
            >
              <ActionList
                items={[
                  {content: `Switch to ${currentPersona === 'shopper' ? 'Manager' : 'Shopper'} (Ctrl+P)`, onAction: () => {togglePersona(); setUserMenuOpen(false);}},
                  {content: 'Business Application', onAction: () => {setCurrentScreen('business-app'); setUserMenuOpen(false);}},
                  {content: 'Account Settings', onAction: () => console.log('Account settings')},
                  {content: 'Support', onAction: () => console.log('Support')},
                ]}
              />
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );

  // Legacy screen components (keeping for now to avoid breaking)
  const ProductsScreen = () => (
    <Page title="All Products" subtitle="Browse our complete catalog">
      <Layout>
        <Layout.Section>
          <Card>
            <Box padding="400">
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">Product Categories</Text>
                <Grid>
                  {categories.map((category, index) => (
                    <Grid.Cell key={index} columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
                      <Card>
                        <Box padding="400">
                          <BlockStack gap="300" inlineAlign="center">
                            <div style={{fontSize: '48px'}}>{category.icon}</div>
                            <Text variant="headingMd" as="h3">{category.name}</Text>
                            <Text>{category.description}</Text>
                            <Button onClick={() => {
                              if (category.id === 'construction-safety-shirts') {
                                setSelectedCategoryId(category.id);
                                setCurrentScreen('category-products');
                              } else {
                                setCurrentScreen('products');
                              }
                            }}>Browse</Button>
                          </BlockStack>
                        </Box>
                      </Card>
                    </Grid.Cell>
                  ))}
                </Grid>
              </BlockStack>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );

  // Simple placeholder screens
  const QuoteBuilderScreen = () => (
    <Page title="Request Quote" backAction={{content: 'Products', onAction: () => setCurrentScreen('products')}}>
      <Card><Box padding="400"><Text>Quote Builder - Coming Soon</Text></Box></Card>
    </Page>
  );

  const BusinessApplicationScreen = () => (
    <Page title="Business Application" backAction={{content: 'Home', onAction: () => setCurrentScreen('home')}}>
      <Card><Box padding="400"><Text>Business Application - Coming Soon</Text></Box></Card>
    </Page>
  );

  const QuotesScreen = () => {
    const cartTotal = cartItems.reduce((sum, item) => {
      const price = item.price_numeric || item.price || 0;
      return sum + (price * item.quantity);
    }, 0);

    return (
      <Page 
        title={currentPersona === 'shopper' ? 'Shopping Cart' : 'Quote Review'}
        subtitle={`${cartItems.length} items • $${cartTotal.toFixed(2)} total`}
        primaryAction={
          currentPersona === 'shopper' 
            ? {content: 'Submit for Approval', onAction: () => console.log('Submit quote')}
            : {content: 'Approve Quote', onAction: () => console.log('Approve quote')}
        }
        secondaryActions={
          currentPersona === 'manager' 
            ? [{content: 'Request Changes', onAction: () => console.log('Request changes')}]
            : []
        }
      >
        <Layout>
          <Layout.Section>
            <Card>
              <Box padding="400">
                {cartItems.length === 0 ? (
                  <BlockStack gap="400" inlineAlign="center">
                    <Text variant="headingMd" as="h2">No items in cart</Text>
                    <Text>Add products to your cart to create a quote</Text>
                    <Button onClick={() => setCurrentScreen('home')}>
                      Continue Shopping
                    </Button>
                  </BlockStack>
                ) : (
                  <BlockStack gap="400">
                    <Text variant="headingLg" as="h2">
                      {currentPersona === 'shopper' ? 'Cart Items' : 'Quote Items for Review'}
                    </Text>
                    {cartItems.map((item, index) => (
                      <Card key={item.id || index} subdued>
                        <Box padding="300">
                          <InlineStack gap="400" align="space-between">
                            <BlockStack gap="200">
                              <Text variant="headingMd">{item.title || item.name}</Text>
                              <Text tone="subdued">SKU: {item.sku}</Text>
                              <Text>Quantity: {item.quantity}</Text>
                            </BlockStack>
                            <BlockStack gap="200" inlineAlign="end">
                              <Text variant="headingMd">${((item.price_numeric || item.price || 0) * item.quantity).toFixed(2)}</Text>
                              {currentPersona === 'shopper' && (
                                <Button 
                                  variant="tertiary" 
                                  tone="critical"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  Remove
                                </Button>
                              )}
                            </BlockStack>
                          </InlineStack>
                        </Box>
                      </Card>
                    ))}
                  </BlockStack>
                )}
              </Box>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  };

  const OrdersScreen = () => (
    <Page title="Orders">
      <Card><Box padding="400"><Text>Orders Management - Coming Soon</Text></Box></Card>
    </Page>
  );

  // Screen router
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen 
            onNavigate={handleNavigate}
            onProductClick={handleProductClick}
            categoriesData={categoriesData}
            safetyProducts={safetyProducts}
            constructionSafetyShirts={constructionSafetyShirts}
            currentPersona={currentPersona}
            addToCart={addToCart}
          />
        );
      case 'products':
        return <ProductsScreen />;
      case 'category-products':
        return (
          <CategoryProductsScreen 
            selectedCategoryId={selectedCategoryId}
            onNavigate={handleNavigate}
            onProductClick={handleProductClick}
            categoriesData={categoriesData}
            allProductsData={allProductsData}
            currentPersona={currentPersona}
            addToCart={addToCart}
          />
        );
      case 'product-detail':
        return (
          <ProductDetailScreen 
            selectedProductId={selectedProductId}
            onNavigate={handleNavigate}
            allProductsData={allProductsData}
            categoriesData={categoriesData}
            currentPersona={currentPersona}
            addToCart={addToCart}
          />
        );
      case 'quote-builder':
        return <QuoteBuilderScreen />;
      case 'business-app':
        return <BusinessApplicationScreen />;
      case 'quotes':
        return <QuotesScreen />;
      case 'orders':
        return <OrdersScreen />;
      default:
        return <HomeScreen onNavigate={handleNavigate} onProductClick={handleProductClick} />;
    }
  };

  return (
    <AppProvider 
      i18n={{}} 
      features={{newDesignLanguage: true}}
      theme={{
        colorScheme: 'light',
        colors: {
          surface: '#ffffff',
          onSurface: '#202223',
          interactive: '#2c5aa0',
          secondary: '#f6f6f7',
          primary: '#00a047',
          critical: '#d72c0d',
          warning: '#ffc453',
          highlight: '#5bcdda',
          success: '#008060',
          decorative: '#ffd79d'
        }
      }}
    >
      <div style={{ minHeight: '100vh', background: '#f6f6f7' }}>
        <HeaderComponent />
        <div style={{ padding: '24px' }}>
          {renderScreen()}
        </div>
      </div>
    </AppProvider>
  );
};

export default VellumApp;