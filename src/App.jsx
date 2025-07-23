import React, { useState, useCallback } from 'react';
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


import categoriesData from './data/categories_data.json';
import productsData from './data/products_data.json';
import siteContent from './data/site_content.json';
import constructionData from './data/construction_products.json';
import constructionSafetyShirts from './data/construction_safety_shirts.json';

const VellumApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);


  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Form states
  const [quoteQuantity, setQuoteQuantity] = useState('25');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessType, setBusinessType] = useState('');

  const toggleSidebar = useCallback(() => setSidebarOpen(!sidebarOpen), [sidebarOpen]);
  const toggleUserMenu = useCallback(() => setUserMenuOpen(!userMenuOpen), [userMenuOpen]);

  const categories = categoriesData.categories;
  const products = productsData.products;
  const siteInfo = siteContent.site;

   // Get the selected product
  const selectedProduct = selectedProductId ? 
    products.find(p => p.id === selectedProductId) : 
    products[0]; // fallback to first product
    
  // Modern App Header Component
  const AppHeader = () => (
    <Box background="bg-surface" padding="400" borderBlockEndWidth="025" borderColor="border">
      <InlineStack align="space-between" blockAlign="center">
        <InlineStack gap="400" blockAlign="center">
          <Button
            variant="tertiary"
            icon={MenuIcon}
            onClick={toggleSidebar}
            accessibilityLabel="Toggle navigation"
          />
          <Text variant="headingLg" as="h1">Vellum</Text>
        </InlineStack>

        <InlineStack gap="300" blockAlign="center">
          <TextField
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search products, orders, quotes..."
            prefix={<Icon source={SearchIcon} />}
            autoComplete="off"
          />
          
          <Button onClick={() => setCurrentScreen('business-app')}>
            Business Application
          </Button>
          <Button>Create Account</Button>
          <Button variant="primary">Log In</Button>

          <Popover
            active={userMenuOpen}
            activator={
              <Button
                variant="tertiary"
                onClick={toggleUserMenu}
                icon={ChevronDownIcon}
              >
                <Avatar initials="AS" />
              </Button>
            }
            onClose={() => setUserMenuOpen(false)}
          >
            <ActionList
              items={[
                {content: 'Profile'},
                {content: 'Settings'},
                {content: 'Help center'},
                {content: 'Sign out'}
              ]}
            />
          </Popover>
        </InlineStack>
      </InlineStack>
    </Box>
  );

  // Modern Sidebar Navigation Component
  const AppSidebar = () => (
    <Box
      background="bg-surface-secondary"
      padding="400"
      borderInlineEndWidth="025"
      borderColor="border"
      minHeight="100vh"
      width={sidebarOpen ? "240px" : "0px"}
      style={{
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        position: 'fixed',
        top: '72px',
        left: 0,
        zIndex: 1000
      }}
    >
      {sidebarOpen && (
        <BlockStack gap="200">
          {[
            { icon: HomeIcon, label: 'Home', screen: 'home' },
            { icon: ProductIcon, label: 'Products', screen: 'products' },
            { icon: NoteIcon, label: 'Quotes', screen: 'quotes' },
            { icon: OrderIcon, label: 'Orders', screen: 'orders' },
            { icon: PersonIcon, label: 'Business Account', screen: 'business-app' }
          ].map((item) => (
            <Button
              key={item.screen}
              variant={currentScreen === item.screen ? 'primary' : 'tertiary'}
              icon={item.icon}
              onClick={() => {
                setCurrentScreen(item.screen);
                setSidebarOpen(false);
              }}
              fullWidth
              textAlign="start"
            >
              {item.label}
            </Button>
          ))}
        </BlockStack>
      )}
    </Box>
  );

  // Modern App Layout Wrapper
  const AppLayout = ({ children }) => (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--p-color-bg)' }}>
      <AppHeader />
      <AppSidebar />
      <div style={{ 
        marginLeft: sidebarOpen ? '240px' : '0px',
        transition: 'margin-left 0.3s ease',
        padding: '24px'
      }}>
        {children}
      </div>
    </div>
  );

  // Home Screen Component
  const HomeScreen = () => (
    <Page title="Welcome to Vellum" subtitle="Your B2B electronics marketplace with flexible payment terms">
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

        <Layout.Section>
          <Card>
            <Box padding="400">
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">Featured Products</Text>
                <Grid>
                 {products.slice(0, 6).map((product, index) => (
                    <Grid.Cell key={index} columnSpan={{xs: 6, sm: 4, md: 4, lg: 4, xl: 4}}>
                      <Card>
                        <Box padding="400">
                          <BlockStack gap="300">
                            <div style={{
                              textAlign: 'center', 
                              fontSize: '48px', 
                              background: `linear-gradient(135deg, ${categories.find(c => c.id === product.categoryId)?.color || '#667eea'} 0%, #764ba2 100%)`,
                              color: 'white', 
                              borderRadius: '8px', 
                              padding: '40px'
                            }}>
                              {product.icon}
                            </div>
                            <Text variant="headingMd" as="h3">{product.name}</Text>
                            <Text variant="headingMd" tone="success">${product.price}</Text>
                            <Text>{product.description}</Text>
                            <InlineStack gap="200">
                              <Button onClick={() => {
                                  setSelectedProductId(product.id);
                                  setCurrentScreen('product-detail');
                                }}>View Details
                              </Button>
                              <Button variant="primary" onClick={() => setCurrentScreen('quote-builder')}>Add to Quote</Button>
                            </InlineStack>
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

  // Products Screen Component
  const ProductsScreen = () => (
    <Page 
      title="Products" 
      subtitle="Browse our catalog of electronics and components"
      primaryAction={{content: 'Request Quote', onAction: () => setCurrentScreen('quote-builder')}}
    >
      <Grid>
        {products.slice(0, 6).map((product, index) => (
          <Grid.Cell key={index} columnSpan={{xs: 6, sm: 4, md: 4, lg: 4, xl: 4}}>
            <Card>
              <Box padding="400">
                <BlockStack gap="300">
                  <div style={{
                    textAlign: 'center', 
                    fontSize: '48px', 
                    background: `linear-gradient(135deg, ${categories.find(c => c.id === product.categoryId)?.color || '#667eea'} 0%, #764ba2 100%)`,
                    color: 'white', 
                    borderRadius: '8px', 
                    padding: '40px'
                  }}>
                    {product.icon}
                  </div>
                  <Text variant="headingMd" as="h3">{product.name}</Text>
                  <Text variant="headingMd" tone="success">${product.price}</Text>
                  <Text>{product.description}</Text>
                  <InlineStack gap="200">
                    <Button onClick={() => {
                        setSelectedProductId(product.id);
                        setCurrentScreen('product-detail');
                      }}>View Details
                    </Button>
                    <Button variant="primary" onClick={() => setCurrentScreen('quote-builder')}>Request Quote</Button>
                  </InlineStack>
                </BlockStack>
              </Box>
            </Card>
          </Grid.Cell>
        ))}
      </Grid>
    </Page>
  );

  // Product Detail Screen Component  
  const ProductDetailScreen = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    
    // Get the construction product data if selectedProductId matches
    const constructionProduct = constructionData.products.find(p => p.id.toString() === selectedProductId?.toString());
    const safetyShirtProduct = constructionSafetyShirts.products.find(p => p.id.toString() === selectedProductId?.toString());
    const displayProduct = safetyShirtProduct || constructionProduct || selectedProduct;
    
    if (!displayProduct) return <div>Product not found</div>;

    // Build volume pricing table from JSON data (if available)
    const volumePricingData = displayProduct.volumePricing ? [
      ['Quantity', 'Unit Price', 'Savings'],
      ...displayProduct.volumePricing.map(tier => [
        tier.maxQty ? `${tier.minQty}-${tier.maxQty}` : `${tier.minQty}+`,
        `$${tier.price.toFixed(2)}`,
        tier.savings > 0 ? `$${tier.savings.toFixed(2)}` : '-'
      ])
    ] : null;

    // Use construction product images if available, otherwise fallback
    const productImages = safetyShirtProduct?.images || constructionProduct?.images || [{
      id: 1,
      src: displayProduct.image,
      alt: displayProduct.name,
      local_path: displayProduct.image
    }];

    return (
      <Page 
        title={displayProduct.title || displayProduct.name}
        subtitle={`${displayProduct.vendor ? `${displayProduct.vendor} | ` : ''}${displayProduct.sku ? `SKU: ${displayProduct.sku}` : ''} ${displayProduct.brand ? `| Brand: ${displayProduct.brand}` : ''}`}
        backAction={{
          content: safetyShirtProduct ? 'Construction Safety Shirts' : 'Products', 
          onAction: () => {
            if (safetyShirtProduct) {
              setSelectedCategoryId('construction-safety-shirts');
              setCurrentScreen('category-products');
            } else {
              setCurrentScreen('products');
            }
          }
        }}
        primaryAction={{content: 'Add to Quote', onAction: () => setCurrentScreen('quote-builder')}}
        secondaryActions={[
          {content: 'Add to Cart'},
          {content: `Buy Now - $${safetyShirtProduct?.price_numeric || constructionProduct?.price_numeric || displayProduct.price}`}
        ]}
      >
        <Layout>
          <Layout.Section>
            <Grid>
              <Grid.Cell columnSpan={{xs: 12, sm: 12, md: 6, lg: 6, xl: 6}}>
                <Card>
                  <Box padding="400">
                    <BlockStack gap="400">
                      {/* Main Product Image */}
                      <div style={{ textAlign: 'center' }}>
                        {productImages[selectedImageIndex] ? (
                          <img 
                            src={`/src/assets/${productImages[selectedImageIndex].local_path || productImages[selectedImageIndex].src}`}
                            alt={productImages[selectedImageIndex].alt || displayProduct.title || displayProduct.name}
                            style={{
                              width: '100%',
                              maxWidth: '500px',
                              height: 'auto',
                              borderRadius: '8px',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}
                            onError={(e) => {
                              // Fallback to icon display if image fails to load
                              e.target.style.display = 'none';
                              e.target.parentNode.innerHTML = `
                                <div style="
                                  width: 100%; 
                                  height: 300px; 
                                  background: linear-gradient(135deg, ${categories.find(c => c.id === displayProduct.categoryId)?.color || '#667eea'} 0%, #764ba2 100%);
                                  color: white;
                                  display: flex;
                                  align-items: center;
                                  justify-content: center;
                                  font-size: 96px;
                                  border-radius: 8px;
                                ">
                                  ${displayProduct.icon || '📦'}
                                </div>
                              `;
                            }}
                          />
                        ) : (
                          <div style={{
                            width: '100%',
                            height: '300px',
                            background: `linear-gradient(135deg, ${categories.find(c => c.id === displayProduct.categoryId)?.color || '#667eea'} 0%, #764ba2 100%)`,
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '96px',
                            borderRadius: '8px'
                          }}>
                            {displayProduct.icon || '📦'}
                          </div>
                        )}
                      </div>

                      {/* Image Thumbnails Gallery */}
                      {productImages.length > 1 && (
                        <div>
                          <Text variant="headingSm" as="h4" tone="subdued">Product Images</Text>
                          <Box paddingBlockStart="200">
                            <InlineStack gap="200" wrap={false}>
                              {productImages.slice(0, 6).map((image, index) => (
                                <div 
                                  key={image.id || index}
                                  onClick={() => setSelectedImageIndex(index)}
                                  style={{
                                    cursor: 'pointer',
                                    padding: '4px',
                                    border: index === selectedImageIndex ? '2px solid #00a047' : '2px solid transparent',
                                    borderRadius: '8px',
                                    minWidth: '80px'
                                  }}
                                >
                                  <img 
                                    src={`/src/assets/${image.local_path || image.src}`}
                                    alt={image.alt || `${displayProduct.title || displayProduct.name} - Image ${index + 1}`}
                                    style={{
                                      width: '80px',
                                      height: '80px',
                                      objectFit: 'cover',
                                      borderRadius: '4px'
                                    }}
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      e.target.parentNode.innerHTML = `
                                        <div style="
                                          width: 80px; 
                                          height: 80px; 
                                          background: #f0f0f0;
                                          display: flex;
                                          align-items: center;
                                          justify-content: center;
                                          font-size: 24px;
                                          border-radius: 4px;
                                        ">📷</div>
                                      `;
                                    }}
                                  />
                                </div>
                              ))}
                              {productImages.length > 6 && (
                                <div style={{
                                  width: '80px',
                                  height: '80px',
                                  background: '#f0f0f0',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: '4px',
                                  fontSize: '12px',
                                  color: '#666'
                                }}>
                                  +{productImages.length - 6}
                                </div>
                              )}
                            </InlineStack>
                          </Box>
                        </div>
                      )}

                      {/* Product Tags */}
                      {(safetyShirtProduct?.tags || constructionProduct?.tags) && (safetyShirtProduct?.tags || constructionProduct?.tags).length > 0 && (
                        <div>
                          <Text variant="headingSm" as="h4" tone="subdued">Tags</Text>
                          <Box paddingBlockStart="200">
                            <InlineStack gap="100" wrap>
                              {(safetyShirtProduct?.tags || constructionProduct?.tags || []).map((tag, index) => (
                                <Badge key={index} tone="info" size="medium">
                                  {tag}
                                </Badge>
                              ))}
                            </InlineStack>
                          </Box>
                        </div>
                      )}
                    </BlockStack>
                  </Box>
                </Card>
              </Grid.Cell>

              <Grid.Cell columnSpan={{xs: 12, sm: 12, md: 6, lg: 6, xl: 6}}>
                <BlockStack gap="400">
                  {/* Product Info Card */}
                  <Card>
                    <Box padding="400">
                      <BlockStack gap="400">
                        <Text variant="headingLg" as="h1">{displayProduct.title || displayProduct.name}</Text>
                        
                        {displayProduct.vendor && (
                          <Text variant="bodyMd" tone="subdued">by {displayProduct.vendor}</Text>
                        )}
                        
                        <Text variant="headingMd" tone="success">
                          ${safetyShirtProduct?.price_numeric?.toFixed(2) || constructionProduct?.price_numeric?.toFixed(2) || displayProduct.price?.toFixed?.(2) || displayProduct.price}
                        </Text>

                        {displayProduct.description && (
                          <Text variant="bodyMd">{displayProduct.description}</Text>
                        )}

                        {/* Stock Status */}
                        <InlineStack gap="200" align="center">
                          <Badge tone={displayProduct.available !== false && displayProduct.inStock !== false ? 'success' : 'critical'}>
                            {displayProduct.available !== false && displayProduct.inStock !== false 
                              ? (displayProduct.stockQuantity ? `${displayProduct.stockQuantity} in stock` : 'In stock')
                              : 'Out of stock'
                            }
                          </Badge>
                          {displayProduct.reviews && (
                            <InlineStack gap="100">
                              <Text>{'★'.repeat(Math.floor(displayProduct.reviews.average || 0))}{'☆'.repeat(5 - Math.floor(displayProduct.reviews.average || 0))}</Text>
                              <Text>({displayProduct.reviews.count} reviews)</Text>
                            </InlineStack>
                          )}
                        </InlineStack>

                        {/* Quantity and Add to Cart */}
                        <BlockStack gap="300">
                          {displayProduct.minimumOrder > 1 && (
                            <Banner tone="info">
                              Minimum order quantity: {displayProduct.minimumOrder} units
                            </Banner>
                          )}
                          
                          <TextField
                            label="Quantity"
                            type="number"
                            value={quantity.toString()}
                            onChange={(value) => setQuantity(Math.max(1, parseInt(value) || 1))}
                            min={displayProduct.minimumOrder || 1}
                          />
                          <Button variant="primary" size="large">
                            Add to Quote
                          </Button>
                        </BlockStack>
                      </BlockStack>
                    </Box>
                  </Card>

                  {/* Volume Pricing */}
                  {volumePricingData && (
                    <Card>
                      <Box padding="400">
                        <BlockStack gap="400">
                          <Text variant="headingMd" as="h3">Volume Pricing</Text>
                          <DataTable
                            columnContentTypes={['text', 'text', 'text']}
                            headings={volumePricingData[0]}
                            rows={volumePricingData.slice(1)}
                          />
                        </BlockStack>
                      </Box>
                    </Card>
                  )}
                </BlockStack>
              </Grid.Cell>
            </Grid>
          </Layout.Section>

          {/* Product Features */}
          {displayProduct.features && (
            <Layout.Section>
              <Card>
                <Box padding="400">
                  <BlockStack gap="400">
                    <Text variant="headingMd" as="h3">Key Features</Text>
                    <Box paddingInlineStart="400">
                      <BlockStack gap="100">
                        {displayProduct.features.map((feature, index) => (
                          <Text key={index}>• {feature}</Text>
                        ))}
                      </BlockStack>
                    </Box>
                  </BlockStack>
                </Box>
              </Card>
            </Layout.Section>
          )}

          {/* Specifications */}
          {displayProduct.specifications && (
            <Layout.Section>
              <Card>
                <Box padding="400">
                  <BlockStack gap="400">
                    <Text variant="headingMd" as="h3">Specifications</Text>
                    <DataTable
                      columnContentTypes={['text', 'text']}
                      headings={['Specification', 'Value']}
                      rows={Object.entries(displayProduct.specifications).map(([key, value]) => [key, value])}
                    />
                  </BlockStack>
                </Box>
              </Card>
            </Layout.Section>
          )}
        </Layout>
      </Page>
    );
  };

  // Category Products Screen Component
  const CategoryProductsScreen = () => {
    const category = categoriesData.categories.find(cat => cat.id === selectedCategoryId);
    
    if (!category) {
      return <div>Category not found</div>;
    }

    // Get products for the selected category
    let categoryProducts = [];
    if (selectedCategoryId === 'construction-safety-shirts') {
      categoryProducts = constructionSafetyShirts.products;
    }

    const handleProductClick = (productId) => {
      setSelectedProductId(productId);
      setCurrentScreen('product-detail');
    };

    return (
      <Page 
        title={category.name}
        subtitle={`${category.description} • ${categoryProducts.length} products`}
        backAction={{content: 'Home', onAction: () => setCurrentScreen('home')}}
      >
        <Layout>
          <Layout.Section>
            <Grid>
              {categoryProducts.map((product) => (
                <Grid.Cell key={product.id} columnSpan={{xs: 6, sm: 4, md: 4, lg: 3, xl: 3}}>
                  <Card>
                    <Box padding="0">
                      {/* Product Image */}
                      <div 
                        style={{ 
                          position: 'relative', 
                          cursor: 'pointer',
                          overflow: 'hidden',
                          borderRadius: '12px 12px 0 0'
                        }}
                        onClick={() => handleProductClick(product.id)}
                      >
                        <img 
                          src={`/src/assets/${product.images[0].local_path}`}
                          alt={product.images[0].alt}
                          style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                            transition: 'transform 0.2s ease'
                          }}
                          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentNode.innerHTML = `
                              <div style="
                                width: 100%; 
                                height: 200px; 
                                background: ${category.color || '#667eea'};
                                color: white;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 48px;
                              ">
                                ${category.icon || '📦'}
                              </div>
                            `;
                          }}
                        />
                        
                        {/* Vendor Badge */}
                        <div style={{
                          position: 'absolute',
                          top: '8px',
                          left: '8px',
                          background: 'rgba(0,0,0,0.7)',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {product.vendor}
                        </div>

                        {/* Stock Badge */}
                        <div style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          background: product.available ? '#00a047' : '#d72c0d',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {product.available ? 'In Stock' : 'Out of Stock'}
                        </div>
                      </div>

                      {/* Product Info */}
                      <Box padding="400">
                        <BlockStack gap="200">
                          <Text 
                            variant="headingSm" 
                            as="h3"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleProductClick(product.id)}
                          >
                            {product.title}
                          </Text>
                          
                          <Text variant="bodyMd" tone="subdued">
                            {product.product_type}
                          </Text>

                          <InlineStack gap="200" blockAlign="center" align="space-between">
                            <Text variant="headingMd" tone="success">
                              ${product.price_numeric.toFixed(2)}
                            </Text>
                            <Button 
                              variant="primary" 
                              size="slim"
                              onClick={() => handleProductClick(product.id)}
                            >
                              View Details
                            </Button>
                          </InlineStack>

                          {/* Product Tags */}
                          <div style={{ marginTop: '8px' }}>
                            <InlineStack gap="100" wrap>
                              {product.tags.slice(0, 3).map((tag, index) => (
                                <Badge key={index} tone="info" size="small">
                                  {tag}
                                </Badge>
                              ))}
                              {product.tags.length > 3 && (
                                <Badge tone="info" size="small">
                                  +{product.tags.length - 3}
                                </Badge>
                              )}
                            </InlineStack>
                          </div>
                        </BlockStack>
                      </Box>
                    </Box>
                  </Card>
                </Grid.Cell>
              ))}
            </Grid>
          </Layout.Section>
        </Layout>
      </Page>
    );
  };

  // Quote Builder Screen Component
  const QuoteBuilderScreen = () => (
    <Page 
      title="Request Quote" 
      subtitle="Get volume pricing for your business needs"
      backAction={{content: 'Products', onAction: () => setCurrentScreen('products')}}
    >
      <Layout>
        <Layout.Section oneHalf>
          <Card>
            <Box padding="400">
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">Quote Items</Text>
                
                <Card>
                  <Box padding="400">
                    <InlineStack gap="400" blockAlign="center">
                      <div style={{
                        width: '80px', 
                        height: '80px', 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '24px'
                      }}>
                        🔌
                      </div>
                      <Box width="100%">
                        <BlockStack gap="200">
                          <Text variant="headingMd" as="h3">Power Supply Module</Text>
                          <Text tone="subdued">500W, Modular, 80+ Gold</Text>
                          <TextField
                            label="Quantity"
                            type="number"
                            value={quoteQuantity}
                            onChange={setQuoteQuantity}
                            autoComplete="off"
                          />
                        </BlockStack>
                      </Box>
                      <BlockStack gap="100" inlineAlign="end">
                        <Text variant="headingMd" tone="success">$198.39</Text>
                        <Text tone="subdued">per unit</Text>
                      </BlockStack>
                    </InlineStack>
                  </Box>
                </Card>

                <Banner tone="success">
                  <BlockStack gap="200">
                    <InlineStack align="space-between">
                      <Text>Subtotal ({quoteQuantity} units):</Text>
                      <Text>${(parseFloat(quoteQuantity) * 198.39).toFixed(2)}</Text>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text>Volume Discount (20%):</Text>
                      <Text tone="success">-${((parseFloat(quoteQuantity) * 247.99) - (parseFloat(quoteQuantity) * 198.39)).toFixed(2)}</Text>
                    </InlineStack>
                    <Divider />
                    <InlineStack align="space-between">
                      <Text variant="headingMd">Estimated Total:</Text>
                      <Text variant="headingMd">${(parseFloat(quoteQuantity) * 198.39).toFixed(2)}</Text>
                    </InlineStack>
                  </BlockStack>
                </Banner>
              </BlockStack>
            </Box>
          </Card>
        </Layout.Section>

        <Layout.Section oneHalf>
          <Card>
            <Box padding="400">
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">Contact Information</Text>
                <FormLayout>
                  <TextField
                    label="Company Name"
                    value={companyName}
                    onChange={setCompanyName}
                    placeholder="Your Company"
                    autoComplete="organization"
                  />
                  <TextField
                    label="Contact Name"
                    value={contactName}
                    onChange={setContactName}
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                  <TextField
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="john@company.com"
                    autoComplete="email"
                  />
                  <TextField
                    label="Phone Number"
                    type="tel"
                    value={phone}
                    onChange={setPhone}
                    placeholder="(555) 123-4567"
                    autoComplete="tel"
                  />
                  <Select
                    label="Project Timeline"
                    options={[
                      {label: 'Immediate (1-2 weeks)', value: 'immediate'},
                      {label: 'Short-term (1 month)', value: 'short'},
                      {label: 'Medium-term (3 months)', value: 'medium'},
                      {label: 'Long-term (6+ months)', value: 'long'},
                    ]}
                    value=""
                  />
                  <TextField
                    label="Additional Requirements"
                    multiline={4}
                    placeholder="Special requirements, customizations, or delivery notes..."
                  />
                  <Button 
                    variant="primary" 
                    size="large" 
                    fullWidth
                    onClick={() => setCurrentScreen('quote-success')}
                  >
                    Submit Quote Request
                  </Button>
                </FormLayout>
              </BlockStack>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );

  // Quote Success Screen Component
  const QuoteSuccessScreen = () => (
    <Page title="">
      <BlockStack gap="400">
        <Banner
          title="✅ Quote Request Submitted"
          tone="success"
        >
          <Text>Thank you! Your quote request has been received and is being processed.</Text>
        </Banner>

        <Card>
          <Box padding="400">
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">What Happens Next?</Text>
              
              <BlockStack gap="400">
                {[
                  {step: '1', title: 'Review & Analysis', description: 'Our team will review your requirements and verify product availability.'},
                  {step: '2', title: 'Custom Pricing', description: 'We\'ll prepare competitive volume pricing based on your quantity and timeline.'},
                  {step: '3', title: 'Quote Delivery', description: 'You\'ll receive a detailed quote via email within 24 hours.'},
                  {step: '4', title: 'Follow-up', description: 'Our sales team may contact you to discuss additional options or answer questions.'}
                ].map((item, index) => (
                  <InlineStack key={index} gap="400">
                    <div style={{
                      background: '#00a047', 
                      color: 'white', 
                      borderRadius: '50%', 
                      width: '32px', 
                      height: '32px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontWeight: 'bold',
                      flexShrink: 0
                    }}>
                      {item.step}
                    </div>
                    <BlockStack gap="100">
                      <Text variant="headingMd" as="h3">{item.title}</Text>
                      <Text tone="subdued">{item.description}</Text>
                    </BlockStack>
                  </InlineStack>
                ))}
              </BlockStack>

              <Banner tone="info">
                <BlockStack gap="200">
                  <Text variant="headingMd" as="h3">Expected Timeline</Text>
                  <Text><strong>Instant Approval:</strong> Some applications may be approved immediately.</Text>
                  <Text><strong>Standard Review:</strong> Most applications are processed within 1-2 business days.</Text>
                </BlockStack>
              </Banner>

              <InlineStack gap="200">
                <Button variant="primary" onClick={() => setCurrentScreen('home')}>🛍️ Continue Shopping</Button>
                <Button onClick={() => setCurrentScreen('quotes')}>📋 View My Quotes</Button>
              </InlineStack>
            </BlockStack>
          </Box>
        </Card>
      </BlockStack>
    </Page>
  );

  // Business Application Screen Component
  const BusinessApplicationScreen = () => (
    <Page title="Apply for Business Account" subtitle="Unlock volume pricing, net payment terms, and dedicated support for your business">
      <BlockStack gap="400">
        <Banner
          title="Business Benefits"
          tone="info"
        >
          <BlockStack gap="200">
            {[
              'Volume pricing discounts up to 30%',
              'Net 30/60/90 payment terms',
              'Working capital financing',
              'Dedicated account manager',
              'Priority customer support',
              'Custom pricing agreements'
            ].map((benefit, index) => (
              <InlineStack key={index} gap="200">
                <Text tone="success">✓</Text>
                <Text>{benefit}</Text>
              </InlineStack>
            ))}
          </BlockStack>
        </Banner>

        <Layout>
          <Layout.Section>
            <Card>
              <Box padding="400">
                <BlockStack gap="400">
                  <Text variant="headingMd" as="h2">Business Information</Text>
                  <FormLayout>
                    <FormLayout.Group>
                      <TextField
                        label="Company Name"
                        value={companyName}
                        onChange={setCompanyName}
                        placeholder="Your Company Name"
                        autoComplete="organization"
                        requiredIndicator
                      />
                      <Select
                        label="Business Type"
                        value={businessType}
                        onChange={setBusinessType}
                        options={[
                          {label: 'Select business type', value: ''},
                          {label: 'Corporation', value: 'corp'},
                          {label: 'LLC', value: 'llc'},
                          {label: 'Partnership', value: 'partnership'},
                          {label: 'Sole Proprietorship', value: 'sole'},
                          {label: 'Non-profit', value: 'nonprofit'},
                        ]}
                        requiredIndicator
                      />
                    </FormLayout.Group>
                    
                    <FormLayout.Group>
                      <TextField
                        label="Federal Tax ID (EIN)"
                        placeholder="XX-XXXXXXX"
                        autoComplete="off"
                        requiredIndicator
                      />
                      <Select
                        label="Years in Business"
                        options={[
                          {label: 'Select years', value: ''},
                          {label: 'Less than 1 year', value: '<1'},
                          {label: '1-2 years', value: '1-2'},
                          {label: '3-5 years', value: '3-5'},
                          {label: '6-10 years', value: '6-10'},
                          {label: 'More than 10 years', value: '10+'},
                        ]}
                        requiredIndicator
                      />
                    </FormLayout.Group>

                    <FormLayout.Group>
                      <Select
                        label="Annual Revenue"
                        options={[
                          {label: 'Select revenue range', value: ''},
                          {label: 'Under $100K', value: '<100k'},
                          {label: '$100K - $500K', value: '100k-500k'},
                          {label: '$500K - $1M', value: '500k-1m'},
                          {label: '$1M - $5M', value: '1m-5m'},
                          {label: 'Over $5M', value: '5m+'},
                        ]}
                        requiredIndicator
                      />
                      <TextField
                        label="Website"
                        type="url"
                        placeholder="https://yourcompany.com"
                        autoComplete="url"
                      />
                    </FormLayout.Group>
                  </FormLayout>
                </BlockStack>
              </Box>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <Box padding="400">
                <BlockStack gap="400">
                  <Text variant="headingMd" as="h2">Contact Information</Text>
                  <FormLayout>
                    <TextField
                      label="Primary Contact Name"
                      value={contactName}
                      onChange={setContactName}
                      placeholder="John Doe"
                      autoComplete="name"
                      requiredIndicator
                    />
                    <TextField
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={setEmail}
                      placeholder="john@company.com"
                      autoComplete="email"
                      requiredIndicator
                    />
                    <TextField
                      label="Phone Number"
                      type="tel"
                      value={phone}
                      onChange={setPhone}
                      placeholder="(555) 123-4567"
                      autoComplete="tel"
                      requiredIndicator
                    />
                    <Button 
                      variant="primary" 
                      size="large" 
                      fullWidth
                      onClick={() => setCurrentScreen('application-submitted')}
                    >
                      Submit Application
                    </Button>
                  </FormLayout>
                </BlockStack>
              </Box>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );

  // Application Submitted Screen Component
  const ApplicationSubmittedScreen = () => (
    <Page title="">
      <BlockStack gap="400">
        <Banner
          title="🎉 Application Submitted!"
          tone="success"
        >
          <Text>Thank you for applying for a business account. We'll review your application and get back to you soon.</Text>
        </Banner>

        <Card>
          <Box padding="400">
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">Application Status</Text>
              
              <InlineStack gap="200" blockAlign="center">
                <Badge tone="attention">📋 Under Review</Badge>
                <Text>Application #VEL-2025-001</Text>
              </InlineStack>

              <BlockStack gap="400">
                {[
                  {icon: '✓', title: 'Application Received', description: 'Your business application has been successfully submitted.', status: 'complete'},
                  {icon: '2', title: 'Credit & Business Verification', description: 'We\'re verifying your business information and running credit checks.', status: 'current'},
                  {icon: '3', title: 'Account Setup', description: 'Upon approval, we\'ll set up your account with appropriate credit limits.', status: 'pending'}
                ].map((step, index) => (
                  <InlineStack key={index} gap="400">
                    <div style={{
                      background: step.status === 'complete' ? '#00a047' : step.status === 'current' ? '#ffa500' : '#f6f6f7',
                      color: step.status === 'pending' ? '#6d7175' : 'white',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      flexShrink: 0
                    }}>
                      {step.icon}
                    </div>
                    <BlockStack gap="100">
                      <Text variant="headingMd" as="h3">{step.title}</Text>
                      <Text tone="subdued">{step.description}</Text>
                    </BlockStack>
                  </InlineStack>
                ))}
              </BlockStack>

              <Banner tone="info">
                <BlockStack gap="200">
                  <Text variant="headingMd" as="h3">Expected Timeline</Text>
                  <Text><strong>Instant Approval:</strong> Some applications may be approved immediately.</Text>
                  <Text><strong>Standard Review:</strong> Most applications are processed within 1-2 business days.</Text>
                </BlockStack>
              </Banner>

              <InlineStack gap="200">
                <Button variant="primary" onClick={() => setCurrentScreen('home')}>🛍️ Start Shopping</Button>
                <Button onClick={() => setCurrentScreen('business-app')}>📧 Check Application Status</Button>
              </InlineStack>
            </BlockStack>
          </Box>
        </Card>
      </BlockStack>
    </Page>
  );

  // Quotes Screen Component
  const QuotesScreen = () => (
    <Page 
      title="My Quotes" 
      subtitle="Track and manage your quote requests"
      primaryAction={{content: 'New Quote', onAction: () => setCurrentScreen('quote-builder')}}
    >
      <Card>
        <Box padding="400">
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2">Recent Quote Requests</Text>
            <ResourceList
              resourceName={{singular: 'quote', plural: 'quotes'}}
              items={[
                {
                  id: 'Q-2025-001',
                  name: 'Power Supply Module (25 units)',
                  date: 'June 23, 2025',
                  status: 'In Review',
                  amount: '$4,959.75',
                  badgeStatus: 'attention'
                },
                {
                  id: 'Q-2025-002',
                  name: 'Network Switch (5 units)',
                  date: 'June 22, 2025',
                  status: 'Ready',
                  amount: '$5,624.95',
                  badgeStatus: 'success'
                }
              ]}
              renderItem={(item) => {
                const {id, name, date, status, amount, badgeStatus} = item;
                return (
                  <ResourceItem id={id}>
                    <InlineStack align="space-between" blockAlign="center">
                      <BlockStack gap="200">
                        <Text variant="bodyMd" fontWeight="bold">{id}</Text>
                        <Text>{name}</Text>
                        <Text tone="subdued">Submitted: {date}</Text>
                      </BlockStack>
                      <BlockStack gap="200" inlineAlign="end">
                        <Badge tone={badgeStatus}>{status}</Badge>
                        <Text variant="headingMd" fontWeight="bold">{amount}</Text>
                      </BlockStack>
                    </InlineStack>
                  </ResourceItem>
                );
              }}
            />
          </BlockStack>
        </Box>
      </Card>
    </Page>
  );

  // Orders Screen Component
  const OrdersScreen = () => (
    <Page 
      title="Orders" 
      subtitle="Track your order history and status"
      primaryAction={{content: 'New Order', onAction: () => setCurrentScreen('products')}}
    >
      <Card>
        <Box padding="400">
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2">Recent Orders</Text>
            <ResourceList
              resourceName={{singular: 'order', plural: 'orders'}}
              items={[
                {
                  id: '#1001',
                  name: 'Memory Modules & Components',
                  date: 'Mar 21, 2025',
                  status: 'Confirmed',
                  amount: '$1,679.90',
                  note: 'Payment due Apr 20',
                  badgeStatus: 'success'
                },
                {
                  id: '#1000',
                  name: 'Test Equipment Package',
                  date: 'Mar 15, 2025',
                  status: 'Delivered',
                  amount: '$3,299.99',
                  note: 'Paid',
                  badgeStatus: 'success'
                }
              ]}
              renderItem={(item) => {
                const {id, name, date, status, amount, note, badgeStatus} = item;
                return (
                  <ResourceItem id={id}>
                    <InlineStack align="space-between" blockAlign="center">
                      <BlockStack gap="200">
                        <Text variant="bodyMd" fontWeight="bold">Order {id}</Text>
                        <Text>{name}</Text>
                        <Text tone="subdued">Confirmed: {date}</Text>
                      </BlockStack>
                      <BlockStack gap="200" inlineAlign="end">
                        <Badge tone={badgeStatus}>{status}</Badge>
                        <Text variant="headingMd" fontWeight="bold">{amount}</Text>
                        <Text tone={note === 'Paid' ? 'success' : 'subdued'}>{note}</Text>
                      </BlockStack>
                    </InlineStack>
                  </ResourceItem>
                );
              }}
            />
          </BlockStack>
        </Box>
      </Card>
    </Page>
  );

  // Screen Router
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'products':
        return <ProductsScreen />;
      case 'category-products':
        return <CategoryProductsScreen />;
      case 'product-detail':
        return <ProductDetailScreen />;
      case 'quote-builder':
        return <QuoteBuilderScreen />;
      case 'quote-success':
        return <QuoteSuccessScreen />;
      case 'quotes':
        return <QuotesScreen />;
      case 'orders':
        return <OrdersScreen />;
      case 'business-app':
        return <BusinessApplicationScreen />;
      case 'application-submitted':
        return <ApplicationSubmittedScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <AppLayout>
      {renderScreen()}
    </AppLayout>
  );
};

export default VellumApp;