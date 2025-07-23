// React components using Shopify Polaris for construction product data
import React, { useState, useCallback } from 'react';
import {
  Page,
  Card,
  ResourceList,
  Avatar,
  TextStyle,
  Badge,
  Thumbnail,
  Stack,
  Button,
  Modal,
  Layout,
  MediaCard,
  Caption,
  Heading,
  DataTable,
  Filters,
  ChoiceList,
  TextField,
  EmptyState
} from '@shopify/polaris';

// Sample data structure that the Python scraper will generate
const sampleProductData = {
  "products": [
    {
      "id": 12345,
      "handle": "portwest-hi-vis-cotton-t-shirt",
      "title": "Portwest Hi-Vis Cotton T-Shirt Short Sleeve S170",
      "description": "High visibility cotton t-shirt with reflective tape for construction workers",
      "price": "$24.99",
      "price_numeric": 24.99,
      "currency": "USD",
      "images": [
        {
          "id": 1,
          "src": "https://example.com/shirt1-front.jpg",
          "alt": "Hi-vis orange t-shirt front view",
          "width": "800",
          "height": "800"
        },
        {
          "id": 2,
          "src": "https://example.com/shirt1-back.jpg", 
          "alt": "Hi-vis orange t-shirt back view",
          "width": "800",
          "height": "800"
        }
      ],
      "variants": [
        {
          "id": 1,
          "title": "Small / Orange",
          "option1": "Small",
          "option2": "Orange",
          "price": 24.99,
          "available": true
        }
      ],
      "vendor": "Safety Vests and More",
      "product_type": "Hi-Vis Safety Shirt",
      "tags": ["hi-vis", "safety", "construction", "portwest"],
      "available": true,
      "url": "https://www.safetyvestsandmore.com/products/portwest-hi-vis-cotton-t-shirt"
    }
  ],
  "total_count": 5,
  "resource_list_items": [
    {
      "id": "12345",
      "name": "Portwest Hi-Vis Cotton T-Shirt Short Sleeve S170",
      "price": "$24.99",
      "image": "https://example.com/shirt1-front.jpg",
      "status": "active",
      "vendor": "Safety Vests and More",
      "type": "Hi-Vis Safety Shirt"
    }
  ]
};

// Main Products Dashboard Component
const ProductsDashboard = ({ productsData = sampleProductData }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState('title asc');
  const [queryValue, setQueryValue] = useState('');
  const [taggedWith, setTaggedWith] = useState('');
  const [vendorFilter, setVendorFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSelectionChange = useCallback(
    (selectionType) => {
      setSelectedItems(selectionType);
    },
    [],
  );

  const handleQueryValueChange = useCallback(
    (value) => setQueryValue(value),
    [],
  );

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    [],
  );

  const handleVendorFilterChange = useCallback(
    (value) => setVendorFilter(value),
    [],
  );

  const handleTypeFilterChange = useCallback(
    (value) => setTypeFilter(value),
    [],
  );

  const handleSortChange = useCallback(
    (value) => setSortValue(value),
    [],
  );

  const handleFiltersClearAll = useCallback(() => {
    setQueryValue('');
    setTaggedWith('');
    setVendorFilter([]);
    setTypeFilter([]);
  }, []);

  const handleProductView = useCallback((product) => {
    setSelectedProduct(product);
    setModalActive(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalActive(false);
    setSelectedProduct(null);
  }, []);

  // Filter products based on current filters
  const filteredProducts = productsData.products.filter((product) => {
    const matchesQuery = product.title.toLowerCase().includes(queryValue.toLowerCase());
    const matchesTag = taggedWith === '' || product.tags.some(tag => 
      tag.toLowerCase().includes(taggedWith.toLowerCase())
    );
    const matchesVendor = vendorFilter.length === 0 || vendorFilter.includes(product.vendor);
    const matchesType = typeFilter.length === 0 || typeFilter.includes(product.product_type);
    
    return matchesQuery && matchesTag && matchesVendor && matchesType;
  });

  // Generate filter options from data
  const vendorOptions = [...new Set(productsData.products.map(p => p.vendor))].map(vendor => ({
    label: vendor,
    value: vendor
  }));

  const typeOptions = [...new Set(productsData.products.map(p => p.product_type))].map(type => ({
    label: type,
    value: type
  }));

  const filters = [
    {
      key: 'taggedWith',
      label: 'Tagged with',
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
    {
      key: 'vendor',
      label: 'Vendor',
      filter: (
        <ChoiceList
          title="Vendor"
          titleHidden
          choices={vendorOptions}
          selected={vendorFilter}
          onChange={handleVendorFilterChange}
          allowMultiple
        />
      ),
    },
    {
      key: 'type',
      label: 'Product type',
      filter: (
        <ChoiceList
          title="Product type"
          titleHidden
          choices={typeOptions}
          selected={typeFilter}
          onChange={handleTypeFilterChange}
          allowMultiple
        />
      ),
    },
  ];

  const appliedFilters = [];
  if (taggedWith) {
    appliedFilters.push({
      key: 'taggedWith',
      label: `Tagged with: ${taggedWith}`,
      onRemove: () => setTaggedWith(''),
    });
  }
  if (vendorFilter.length > 0) {
    appliedFilters.push({
      key: 'vendor',
      label: `Vendor: ${vendorFilter.join(', ')}`,
      onRemove: () => setVendorFilter([]),
    });
  }
  if (typeFilter.length > 0) {
    appliedFilters.push({
      key: 'type',
      label: `Type: ${typeFilter.join(', ')}`,
      onRemove: () => setTypeFilter([]),
    });
  }

  const sortOptions = [
    { label: 'Title A-Z', value: 'title asc' },
    { label: 'Title Z-A', value: 'title desc' },
    { label: 'Price Low-High', value: 'price asc' },
    { label: 'Price High-Low', value: 'price desc' },
  ];

  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const [field, direction] = sortValue.split(' ');
    const multiplier = direction === 'desc' ? -1 : 1;
    
    if (field === 'price') {
      return (a.price_numeric - b.price_numeric) * multiplier;
    }
    return a[field].localeCompare(b[field]) * multiplier;
  });

  const resourceName = {
    singular: 'product',
    plural: 'products',
  };

  const renderItem = (item) => {
    const { id, title, price, images, vendor, tags, available } = item;
    const media = images.length > 0 ? (
      <Thumbnail
        source={images[0].src}
        alt={images[0].alt || title}
        size="medium"
      />
    ) : (
      <Avatar customer size="medium" />
    );

    return (
      <ResourceList.Item
        id={id}
        media={media}
        accessibilityLabel={`View details for ${title}`}
        onClick={() => handleProductView(item)}
      >
        <Stack>
          <Stack.Item fill>
            <Heading>{title}</Heading>
            <div style={{ marginTop: '4px' }}>
              <TextStyle variation="subdued">{vendor}</TextStyle>
            </div>
            <div style={{ marginTop: '4px' }}>
              <TextStyle variation="strong">{price}</TextStyle>
              <Badge status={available ? 'success' : 'critical'} size="small">
                {available ? 'Available' : 'Out of stock'}
              </Badge>
            </div>
            <div style={{ marginTop: '8px' }}>
              {tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} size="small" status="info">
                  {tag}
                </Badge>
              ))}
            </div>
          </Stack.Item>
        </Stack>
      </ResourceList.Item>
    );
  };

  const emptyStateMarkup = (
    <EmptyState
      heading="No products found"
      description="Try changing the filters or search term"
      image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
    />
  );

  return (
    <Page title="Construction Safety Products" subtitle={`${productsData.total_count} products`}>
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={resourceName}
              items={sortedProducts}
              renderItem={renderItem}
              selectedItems={selectedItems}
              onSelectionChange={handleSelectionChange}
              promotedBulkActions={[
                {
                  content: 'Export selected',
                  onAction: () => console.log('Export selected products'),
                },
              ]}
              bulkActions={[
                {
                  content: 'Add tags',
                  onAction: () => console.log('Add tags to selected'),
                },
                {
                  content: 'Remove tags',
                  onAction: () => console.log('Remove tags from selected'),
                },
              ]}
              sortOptions={sortOptions}
              sortValue={sortValue}
              onSortChange={handleSortChange}
              filterControl={
                <Filters
                  queryValue={queryValue}
                  filters={filters}
                  appliedFilters={appliedFilters}
                  onQueryChange={handleQueryValueChange}
                  onQueryClear={() => setQueryValue('')}
                  onClearAll={handleFiltersClearAll}
                />
              }
              emptyState={emptyStateMarkup}
            />
          </Card>
        </Layout.Section>
      </Layout>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <Modal
          open={modalActive}
          onClose={handleModalClose}
          title={selectedProduct.title}
          size="large"
        >
          <Modal.Section>
            <ProductDetailView product={selectedProduct} />
          </Modal.Section>
        </Modal>
      )}
    </Page>
  );
};

// Product Detail Component
const ProductDetailView = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <Layout>
      <Layout.Section oneHalf>
        <Card>
          <Card.Section>
            {product.images.length > 0 && (
              <div>
                <img
                  src={product.images[selectedImageIndex].src}
                  alt={product.images[selectedImageIndex].alt}
                  style={{ width: '100%', height: 'auto', marginBottom: '16px' }}
                />
                {product.images.length > 1 && (
                  <Stack spacing="tight">
                    {product.images.map((image, index) => (
                      <Button
                        key={image.id}
                        plain
                        pressed={index === selectedImageIndex}
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <Thumbnail
                          source={image.src}
                          alt={image.alt}
                          size="small"
                        />
                      </Button>
                    ))}
                  </Stack>
                )}
              </div>
            )}
          </Card.Section>
        </Card>
      </Layout.Section>

      <Layout.Section oneHalf>
        <Card>
          <Card.Section>
            <Stack vertical>
              <Heading>{product.title}</Heading>
              <TextStyle variation="subdued">{product.vendor}</TextStyle>
              <Heading size="medium">{product.price}</Heading>
              
              {product.description && (
                <div>
                  <Caption>Description</Caption>
                  <p>{product.description}</p>
                </div>
              )}

              <div>
                <Caption>Tags</Caption>
                <Stack spacing="tight">
                  {product.tags.map((tag, index) => (
                    <Badge key={index} size="small">
                      {tag}
                    </Badge>
                  ))}
                </Stack>
              </div>

              {product.variants.length > 0 && (
                <div>
                  <Caption>Variants</Caption>
                  <DataTable
                    columnContentTypes={['text', 'text', 'numeric', 'text']}
                    headings={['Title', 'Option 1', 'Price', 'Available']}
                    rows={product.variants.map(variant => [
                      variant.title,
                      variant.option1 || '-',
                      variant.price ? `$${variant.price}` : '-',
                      variant.available ? 'Yes' : 'No'
                    ])}
                  />
                </div>
              )}

              <Button primary external url={product.url}>
                View Original Product
              </Button>
            </Stack>
          </Card.Section>
        </Card>
      </Layout.Section>
    </Layout>
  );
};

// Alternative Card Grid View Component
const ProductCardGrid = ({ productsData = sampleProductData }) => {
  return (
    <Page title="Construction Safety Products - Card View">
      <Layout>
        {productsData.products.map((product) => (
          <Layout.Section key={product.id} oneThird>
            <MediaCard
              title={product.title}
              primaryAction={{
                content: 'View Product',
                onAction: () => window.open(product.url, '_blank'),
              }}
              description={`${product.vendor} • ${product.price}`}
              size="medium"
            >
              {product.images.length > 0 && (
                <img
                  alt={product.images[0].alt}
                  width="100%"
                  height="200"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  src={product.images[0].src}
                />
              )}
            </MediaCard>
          </Layout.Section>
        ))}
      </Layout>
    </Page>
  );
};

export default ProductsDashboard;
export { ProductCardGrid, ProductDetailView };
