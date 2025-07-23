import React from 'react';
import {
  Page,
  Layout,
  Grid
} from '@shopify/polaris';
import ProductCard from '../shared/ProductCard';

const CategoryProductsScreen = ({ 
  selectedCategoryId,
  onNavigate,
  onProductClick,
  categoriesData,
  allProductsData
}) => {
  const category = categoriesData.categories.find(cat => cat.id === selectedCategoryId);
  
  if (!category) {
    return <div>Category not found</div>;
  }

  // Get products for the selected category
  let categoryProducts = [];
  if (selectedCategoryId === 'construction-safety-shirts') {
    categoryProducts = allProductsData.constructionSafetyShirts?.products || [];
  } else if (selectedCategoryId === 'safety-equipment') {
    categoryProducts = allProductsData.safetyProducts?.products || [];
  } else if (selectedCategoryId === 'safety-footwear') {
    categoryProducts = allProductsData.safetyShoes?.products || [];
  }

  return (
    <Page 
      title={category.name}
      subtitle={`${category.description} • ${categoryProducts.length} products`}
      backAction={{content: 'Home', onAction: () => onNavigate('home')}}
    >
      <Layout>
        <Layout.Section>
          <Grid>
            {categoryProducts.map((product) => (
              <Grid.Cell key={product.id} columnSpan={{xs: 6, sm: 4, md: 4, lg: 3, xl: 3}}>
                <ProductCard 
                  product={product}
                  onProductClick={onProductClick}
                  imageHeight="200px"
                />
              </Grid.Cell>
            ))}
          </Grid>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default CategoryProductsScreen;