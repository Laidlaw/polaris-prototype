import React from 'react';
import {
  Card,
  Box,
  Text,
  Button,
  InlineStack,
  BlockStack
} from '@shopify/polaris';

const ProductCard = ({ 
  product, 
  onProductClick, 
  showFeaturedBadge = false,
  imageHeight = '250px' 
}) => {
  if (!product) return null;

  return (
    <Card>
      <Box padding="0">
        <div 
          style={{ 
            position: 'relative', 
            cursor: 'pointer',
            overflow: 'hidden',
            borderRadius: '12px 12px 0 0'
          }}
          onClick={() => onProductClick(product.id)}
        >
          <img 
            src={`/src/assets/${product.images[0].local_path}`}
            alt={product.images[0].alt || product.title}
            style={{
              width: '100%',
              height: imageHeight,
              objectFit: 'cover'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentNode.innerHTML = `
                <div style="
                  width: 100%; 
                  height: ${imageHeight}; 
                  background: #FF6B35;
                  color: white;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 48px;
                ">🦺</div>
              `;
            }}
          />
          
          {/* Vendor Badge */}
          {product.vendor && (
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
          )}

          {/* Featured Badge */}
          {showFeaturedBadge && (
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: '#00a047',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              Featured
            </div>
          )}

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

        <Box padding="400">
          <BlockStack gap="200">
            <Text 
              variant="headingSm" 
              as="h3"
              style={{ cursor: 'pointer' }}
              onClick={() => onProductClick(product.id)}
            >
              {product.title}
            </Text>
            
            {product.product_type && (
              <Text variant="bodyMd" tone="subdued">
                {product.product_type}
              </Text>
            )}

            <InlineStack gap="200" align="space-between" blockAlign="center">
              <Text variant="headingMd" tone="success">
                ${product.price_numeric?.toFixed(2) || 'Contact for pricing'}
              </Text>
              <Button 
                variant="primary" 
                size="slim"
                onClick={() => onProductClick(product.id)}
              >
                View Details
              </Button>
            </InlineStack>
          </BlockStack>
        </Box>
      </Box>
    </Card>
  );
};

export default ProductCard;