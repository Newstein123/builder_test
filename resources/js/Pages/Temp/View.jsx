import React from 'react'
import { useState } from 'react';
import { router } from '@inertiajs/react';

const View = ({data, templateStructure, products, count}) => {
    const productsPerPage = 5; // Adjust the number of products per page
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalPages = Math.ceil(count / productsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        router.get('/test/template', {page : currentPage})
    };

    const replacePlaceholders = (template, replacements) => {
        return template.replace(/{{\s*(\w+)\s*}}/g, (match, placeholder) => {
          // If the placeholder exists in the replacements object, use the replacement value
          return replacements.hasOwnProperty(placeholder) ? replacements[placeholder] : match;
        });
      };

      const renderProductSection = (products) => {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const currentProducts = products.slice(startIndex, endIndex);

        return products.map(product => (
          `<div key="${product.id}" style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden; margin-bottom: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); background-color: #fff;">
             <img src="${product.image}" alt="${product.name}" style="width: 100%; height: auto; max-height: 200px; object-fit: cover;">
             <div style="padding: 16px;">
               <h3 style="font-size: 1.5rem; margin-bottom: 8px;">${product.name}</h3>
               <p style="color: #555; margin-bottom: 12px;">${product.quantity}</p>
               <span style="font-weight: bold; font-size: 1.25rem; color: #e44d26;">${product.price}</span>
             </div>
           </div>`
        ));
      };
      

      const renderedTemplate = replacePlaceholders(templateStructure, {
        ...Object.keys(data).reduce((acc, key) => {
          acc[`${key}`] = data[key];
          return acc;
        }, {}),
        product_section : renderProductSection(products),
      });

      const paginationComponent = React.createElement(Pagination, {
        totalPages,
        currentPage,
        onPageChange: handlePageChange,
      });

    return (
        <div>
        {React.createElement('div', { dangerouslySetInnerHTML: { __html: renderedTemplate} })}
        {paginationComponent}
      </div>
    )
}

export default View

export const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const pages = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        React.createElement(
          'button',
          {
            key: i,
            onClick: () => onPageChange(i),
            className: currentPage === i ? 'active' : 'pagination-button',
            style: {
              // Add your inline styles here
              margin: '2px',
              padding: '5px 10px',
              backgroundColor: currentPage === i ? '#007bff' : '#fff',
              color: currentPage === i ? '#fff' : '#007bff',
              border: '1px solid #007bff',
              borderRadius: '5px',
              cursor: 'pointer',
            },
          },
          i
        )
      );
    }
  
    return React.createElement('div', { className: 'pagination' }, pages);
  };
