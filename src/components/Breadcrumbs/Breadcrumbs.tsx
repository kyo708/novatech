import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import './Breadcrumbs.css';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
      <ol className="breadcrumbs-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <li key={index} className="breadcrumbs-item">
              {/* Separator (skip for first item) */}
              {index > 0 && (
                <span className="breadcrumbs-separator" aria-hidden="true">
                  <ChevronRight size={14} />
                </span>
              )}

              {/* Last item = plain text (current page) */}
              {isLast ? (
                <span className="breadcrumbs-current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to || '/'}
                  className="breadcrumbs-link"
                >
                  {isFirst && (
                    <span className="breadcrumbs-home-icon">
                      <Home size={14} />
                    </span>
                  )}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
