import React from 'react';
import {
  Page,
  Layout,
  Card,
  Box,
  Text,
  Button,
  InlineStack,
  BlockStack,
  Grid
} from '@shopify/polaris';
import ProductCard from '../shared/ProductCard';

const HomeScreen = ({ 
  onNavigate, 
  onProductClick,
  categoriesData,
  safetyProducts,
  constructionSafetyShirts,
  safetyShoes,
  cartItems
}) => {
  // Get featured products from different categories
  const featuredProducts = [
    safetyProducts.products.find(p => p.product_type === "Hard Hats"),
    constructionSafetyShirts.products[0],
    safetyShoes?.products[0]
  ].filter(Boolean);

  const handleCategoryClick = (categoryId) => {
    if (categoryId === 'construction-safety-shirts' || categoryId === 'safety-footwear' || categoryId === 'safety-equipment') {
      onNavigate('category-products', { categoryId });
    } else {
      onNavigate('products');
    }
  };

  return (
    <Page>
      <Layout>
        {/* Hero Section */}
        <Layout.Section>
          <Card>
            <Box padding="600">
              <BlockStack gap="400" inlineAlign="center">
                <Text variant="heading2xl" as="h1" alignment="center">
                  Vellum Construction Supply
                </Text>
                <Text variant="headingLg" as="h2" alignment="center" tone="subdued">
                  Professional Safety Equipment & Construction Supplies
                </Text>
                <Text variant="bodyLg" alignment="center">
                  Serving contractors and construction professionals with premium safety gear, 
                  competitive pricing, and flexible B2B payment terms including Net 30/60/90.
                </Text>
                <InlineStack gap="300" align="center">
                  <Button variant="primary" size="large" onClick={() => onNavigate('products')}>
                    Shop All Products
                  </Button>
                  {cartItems && cartItems.length > 0 && (
                    <Button variant="secondary" size="large" onClick={() => onNavigate('quotes')}>
                      🛒 View Cart ({cartItems.length})
                    </Button>
                  )}
                  <Button variant="secondary" size="large" onClick={() => onNavigate('business-app')}>
                    Apply for Business Account
                  </Button>
                </InlineStack>
              </BlockStack>
            </Box>
          </Card>
        </Layout.Section>

        {/* Trust Indicators */}
        <Layout.Section>
          <Card>
            <Box padding="400">
              <InlineStack gap="600" align="center" blockAlign="center">
                <div style={{ textAlign: 'center' }}>
                  <Text variant="headingSm" as="h3">🏗️ ANSI Compliant</Text>
                  <Text tone="subdued">Certified Safety Standards</Text>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Text variant="headingSm" as="h3">🚚 Free Shipping</Text>
                  <Text tone="subdued">On orders over $500</Text>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Text variant="headingSm" as="h3">💳 Net Terms</Text>
                  <Text tone="subdued">30/60/90 day payment options</Text>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Text variant="headingSm" as="h3">📞 Expert Support</Text>
                  <Text tone="subdued">Construction industry specialists</Text>
                </div>
              </InlineStack>
            </Box>
          </Card>
        </Layout.Section>

        {/* Featured Products */}
        <Layout.Section>
          <Card>
            <Box padding="400">
              <BlockStack gap="400">
                <Text variant="headingLg" as="h2">Featured Safety Equipment</Text>
                <Grid>
                  {featuredProducts.slice(0, 3).map((product) => (
                    <Grid.Cell key={product.id} columnSpan={{xs: 6, sm: 4, md: 4, lg: 4, xl: 4}}>
                      <ProductCard 
                        product={product}
                        onProductClick={onProductClick}
                        showFeaturedBadge={false}
                      />
                    </Grid.Cell>
                  ))}
                </Grid>
              </BlockStack>
            </Box>
          </Card>
        </Layout.Section>

        {/* Product Categories */}
        <Layout.Section>
          <Card>
            <Box padding="400">
              <BlockStack gap="400">
                <Text variant="headingLg" as="h2">Shop by Category</Text>
                <Grid>
                  {categoriesData.categories.map((category, index) => {
                    // Get a representative product image for each category
                    let categoryImage = null;
                    if (category.id === 'construction-safety-shirts') {
                      categoryImage = constructionSafetyShirts.products[0]?.images[0];
                    } else if (category.id === 'safety-equipment') {
                      const hardHat = safetyProducts.products.find(p => p.product_type === "Hard Hats");
                      categoryImage = hardHat?.images[0];
                    } else if (category.id === 'safety-footwear') {
                      categoryImage = safetyShoes?.products[0]?.images[0];
                    }

                    return (
                      <Grid.Cell key={index} columnSpan={{xs: 6, sm: 4, md: 3, lg: 3, xl: 3}}>
                        <Card>
                          <Box padding="0">
                            <div 
                              style={{ 
                                cursor: 'pointer',
                                borderRadius: '12px 12px 0 0',
                                overflow: 'hidden'
                              }}
                              onClick={() => handleCategoryClick(category.id)}
                            >
                              {categoryImage ? (
                                <img 
                                  src={`/src/assets/${categoryImage.local_path}`}
                                  alt={category.name}
                                  style={{
                                    width: '100%',
                                    height: '180px',
                                    objectFit: 'cover'
                                  }}
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentNode.innerHTML = `
                                      <div style="
                                        width: 100%; 
                                        height: 180px; 
                                        background: ${category.color};
                                        color: white;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        font-size: 48px;
                                      ">
                                        ${category.icon}
                                      </div>
                                    `;
                                  }}
                                />
                              ) : (
                                <div style={{
                                  width: '100%',
                                  height: '180px',
                                  background: category.color,
                                  color: 'white',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '48px'
                                }}>
                                  {category.icon}
                                </div>
                              )}
                            </div>
                            <Box padding="400">
                              <BlockStack gap="200" inlineAlign="start">
                                <Text variant="headingMd" as="h3">{category.name}</Text>
                                <Text variant="bodyMd" tone="subdued">{category.description}</Text>
                                <Text variant="bodySm" tone="subdued">{category.productCount} products</Text>
                                <Button 
                                  variant="secondary" 
                                  size="slim"
                                  onClick={() => handleCategoryClick(category.id)}
                                >
                                  Browse Category
                                </Button>
                              </BlockStack>
                            </Box>
                          </Box>
                        </Card>
                      </Grid.Cell>
                    );
                  })}
                </Grid>
              </BlockStack>
            </Box>
          </Card>
        </Layout.Section>

        {/* B2B Value Proposition */}
        <Layout.Section>
          <Card>
            <Box padding="500">
              <BlockStack gap="400" inlineAlign="center">
                <Text variant="headingLg" as="h2" alignment="center">
                  Why Choose Vellum Construction Supply?
                </Text>
                <InlineStack gap="600" align="center">
                  <div style={{ textAlign: 'center', maxWidth: '200px' }}>
                    <Text variant="headingSm" as="h3">Flexible Payment Terms</Text>
                    <Text tone="subdued">
                      Net 30, 60, and 90-day payment options with instant credit approval for qualified businesses.
                    </Text>
                  </div>
                  <div style={{ textAlign: 'center', maxWidth: '200px' }}>
                    <Text variant="headingSm" as="h3">Volume Discounts</Text>
                    <Text tone="subdued">
                      Competitive pricing with quantity breaks for bulk orders and repeat customers.
                    </Text>
                  </div>
                  <div style={{ textAlign: 'center', maxWidth: '200px' }}>
                    <Text variant="headingSm" as="h3">Industry Expertise</Text>
                    <Text tone="subdued">
                      Construction professionals who understand your safety requirements and project needs.
                    </Text>
                  </div>
                </InlineStack>
              </BlockStack>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default HomeScreen;