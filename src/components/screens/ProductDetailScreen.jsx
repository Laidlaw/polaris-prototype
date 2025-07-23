import React, { useState } from 'react';
import {
  Page,
  Layout,
  Card,
  Box,
  Text,
  Button,
  TextField,
  Badge,
  Banner,
  InlineStack,
  BlockStack,
  Grid,
  DataTable
} from '@shopify/polaris';

const ProductDetailScreen = ({ 
  selectedProductId,
  onNavigate,
  allProductsData,
  categoriesData,
  currentPersona,
  addToCart
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  // Find product across all data sources
  const findProduct = (id) => {
    const sources = [
      allProductsData.safetyProducts?.products || [],
      allProductsData.constructionSafetyShirts?.products || [],
      allProductsData.constructionData?.products || [],
      allProductsData.productsData?.products || []
    ];
    
    for (const source of sources) {
      const product = source.find(p => p.id.toString() === id?.toString());
      if (product) return product;
    }
    return null;
  };

  const displayProduct = findProduct(selectedProductId);
  
  if (!displayProduct) {
    return (
      <Page title="Product Not Found">
        <Card>
          <Box padding="400">
            <Text>Product not found</Text>
            <Button onClick={() => onNavigate('home')}>Return to Home</Button>
          </Box>
        </Card>
      </Page>
    );
  }

  // Build volume pricing table from JSON data (if available)
  const volumePricingData = displayProduct.volumePricing ? [
    ['Quantity', 'Unit Price', 'Savings'],
    ...displayProduct.volumePricing.map(tier => [
      tier.maxQty ? `${tier.minQty}-${tier.maxQty}` : `${tier.minQty}+`,
      `$${tier.price.toFixed(2)}`,
      tier.savings > 0 ? `$${tier.savings.toFixed(2)}` : '-'
    ])
  ] : null;

  // Use product images if available, otherwise fallback
  const productImages = displayProduct.images || [{
    id: 1,
    src: displayProduct.image,
    alt: displayProduct.name || displayProduct.title,
    local_path: displayProduct.image
  }];

  // Determine back navigation
  const handleBackNavigation = () => {
    if (displayProduct.product_type === "Hi-Vis Safety Shirt") {
      onNavigate('category-products', { categoryId: 'construction-safety-shirts' });
    } else {
      onNavigate('products');
    }
  };

  const getPrice = () => {
    return displayProduct.price_numeric?.toFixed(2) || 
           displayProduct.price?.toFixed?.(2) || 
           displayProduct.price || 
           'Contact for pricing';
  };

  return (
    <Page 
      title={displayProduct.title || displayProduct.name}
      subtitle={`${displayProduct.vendor ? `${displayProduct.vendor} | ` : ''}${displayProduct.sku ? `SKU: ${displayProduct.sku}` : ''} ${displayProduct.brand ? `| Brand: ${displayProduct.brand}` : ''}`}
      backAction={{
        content: displayProduct.product_type === "Hi-Vis Safety Shirt" ? 'Construction Safety Shirts' : 'Products', 
        onAction: handleBackNavigation
      }}
      primaryAction={{
        content: currentPersona === 'shopper' ? 'Add to Cart' : 'Add to Quote', 
        onAction: () => addToCart(displayProduct, quantity)
      }}
      secondaryActions={[
        {content: 'View Cart', onAction: () => onNavigate('quotes')},
        {content: `Buy Now - $${getPrice()}`}
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
                            e.target.style.display = 'none';
                            e.target.parentNode.innerHTML = `
                              <div style="
                                width: 100%; 
                                height: 300px; 
                                background: #FF6B35;
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
                          background: '#FF6B35',
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
                    {displayProduct.tags && displayProduct.tags.length > 0 && (
                      <div>
                        <Text variant="headingSm" as="h4" tone="subdued">Tags</Text>
                        <Box paddingBlockStart="200">
                          <InlineStack gap="100" wrap>
                            {displayProduct.tags.map((tag, index) => (
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
                        ${getPrice()}
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
                        <Button 
                          variant="primary" 
                          size="large"
                          onClick={() => addToCart(displayProduct, quantity)}
                        >
                          {currentPersona === 'shopper' ? 'Add to Cart' : 'Add to Quote'}
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

export default ProductDetailScreen;