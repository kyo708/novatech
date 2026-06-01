import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../services/api';
import { formatPrice } from '../../utils/format';
import { useToast } from '../../context/ToastContext';
import type { Product } from '../../types';
import { 
  Plus, Edit2, Trash2, Search, Filter, 
  Package, AlertTriangle, X, Check, Image,
  FolderOpen, Coins
} from 'lucide-react';
import './Inventory.css';

export const Inventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  // Tìm kiếm & Lọc state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStockStatus, setSelectedStockStatus] = useState('All');

  // Modal quản lý state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Form Fields State
  const [formId, setFormId] = useState('');
  const [formName, setFormName] = useState('');
  const [formPrice, setFormPrice] = useState(0);
  const [formOriginalPrice, setFormOriginalPrice] = useState<number | undefined>(undefined);
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState('Laptops');
  const [formImage, setFormImage] = useState('');
  const [formInStock, setFormInStock] = useState(true);
  const [formStockPercentage, setFormStockPercentage] = useState(100);

  // Form Dynamic Lists
  const [formImages, setFormImages] = useState<string[]>([]);
  const [newImageLink, setNewImageLink] = useState('');

  const [formFeatures, setFormFeatures] = useState<string[]>([]);
  const [newFeatureText, setNewFeatureText] = useState('');

  const [formSpecs, setFormSpecs] = useState<Record<string, string>>({});
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecVal, setNewSpecVal] = useState('');

  // Tải danh sách sản phẩm từ backend khi vào trang
  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err: any) {
      showToast('Không thể kết nối đến máy chủ Backend. Đang hiển thị chế độ offline.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Lọc sản phẩm reactively
  useEffect(() => {
    let result = [...products];

    // Lọc theo từ khóa tìm kiếm
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        p.id.toLowerCase().includes(query)
      );
    }

    // Lọc theo danh mục
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Lọc theo trạng thái tồn kho
    if (selectedStockStatus !== 'All') {
      if (selectedStockStatus === 'Out') {
        result = result.filter(p => !p.inStock || p.stockPercentage === 0);
      } else if (selectedStockStatus === 'Low') {
        result = result.filter(p => p.inStock && p.stockPercentage > 0 && p.stockPercentage <= 10);
      } else if (selectedStockStatus === 'Ok') {
        result = result.filter(p => p.inStock && p.stockPercentage > 10);
      }
    }

    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, selectedStockStatus]);

  // Mở modal Thêm sản phẩm mới
  const handleAddClick = () => {
    setCurrentProduct(null);
    setFormId('');
    setFormName('');
    setFormPrice(0);
    setFormOriginalPrice(undefined);
    setFormDescription('');
    setFormCategory('Laptops');
    setFormImage('');
    setFormInStock(true);
    setFormStockPercentage(100);
    setFormImages([]);
    setFormFeatures([]);
    setFormSpecs({});
    setIsFormModalOpen(true);
  };

  // Mở modal Sửa sản phẩm
  const handleEditClick = (product: Product) => {
    setCurrentProduct(product);
    setFormId(product.id);
    setFormName(product.name);
    setFormPrice(product.price);
    setFormOriginalPrice(product.originalPrice);
    setFormDescription(product.description || '');
    setFormCategory(product.category);
    setFormImage(product.image || '');
    setFormInStock(product.inStock);
    setFormStockPercentage(product.stockPercentage);
    setFormImages(product.images || []);
    setFormFeatures(product.features || []);
    setFormSpecs(product.specs || {});
    setIsFormModalOpen(true);
  };

  // Mở modal Xóa sản phẩm
  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  // Thêm ảnh phụ vào danh sách động
  const handleAddImage = () => {
    if (newImageLink.trim()) {
      setFormImages([...formImages, newImageLink.trim()]);
      setNewImageLink('');
    }
  };

  // Xóa ảnh phụ
  const handleRemoveImage = (index: number) => {
    setFormImages(formImages.filter((_, i) => i !== index));
  };

  // Thêm đặc tính (Feature) vào danh sách động
  const handleAddFeature = () => {
    if (newFeatureText.trim()) {
      setFormFeatures([...formFeatures, newFeatureText.trim()]);
      setNewFeatureText('');
    }
  };

  // Xóa đặc tính
  const handleRemoveFeature = (index: number) => {
    setFormFeatures(formFeatures.filter((_, i) => i !== index));
  };

  // Thêm thông số specs
  const handleAddSpec = () => {
    if (newSpecKey.trim() && newSpecVal.trim()) {
      setFormSpecs({
        ...formSpecs,
        [newSpecKey.trim()]: newSpecVal.trim()
      });
      setNewSpecKey('');
      setNewSpecVal('');
    }
  };

  // Xóa thông số specs
  const handleRemoveSpec = (key: string) => {
    const updated = { ...formSpecs };
    delete updated[key];
    setFormSpecs(updated);
  };

  // Submit form Thêm hoặc Sửa sản phẩm
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName.trim()) {
      showToast('Vui lòng nhập tên sản phẩm!', 'error');
      return;
    }
    if (formPrice <= 0) {
      showToast('Đơn giá sản phẩm phải lớn hơn 0!', 'error');
      return;
    }

    const payload: Omit<Product, 'reviews'> = {
      id: formId,
      name: formName.trim(),
      price: formPrice,
      originalPrice: formOriginalPrice || undefined,
      description: formDescription.trim(),
      category: formCategory,
      image: formImage.trim() || 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=500&q=80',
      inStock: formInStock,
      stockPercentage: formStockPercentage,
      images: formImages,
      features: formFeatures,
      specs: formSpecs,
      colors: currentProduct ? currentProduct.colors : ['Default'],
      rating: currentProduct ? currentProduct.rating : 5.0,
      reviewsCount: currentProduct ? currentProduct.reviewsCount : 0,
      tags: currentProduct ? currentProduct.tags : []
    };

    try {
      if (currentProduct) {
        // Cập nhật sản phẩm
        const updated = await updateProduct(currentProduct.id, payload);
        setProducts(products.map(p => p.id === currentProduct.id ? { ...p, ...updated } : p));
        showToast('Cập nhật sản phẩm thành công!', 'success');
      } else {
        // Tạo sản phẩm mới
        const created = await createProduct(payload);
        setProducts([...products, created]);
        showToast('Thêm sản phẩm mới thành công!', 'success');
      }
      setIsFormModalOpen(false);
    } catch (err: any) {
      showToast(err.message || 'Thao tác lưu sản phẩm thất bại!', 'error');
    }
  };

  // Thực thi xóa sản phẩm
  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduct(productToDelete.id);
      setProducts(products.filter(p => p.id !== productToDelete.id));
      showToast('Xóa sản phẩm thành công!', 'success');
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (err: any) {
      showToast(err.message || 'Xóa sản phẩm thất bại!', 'error');
    }
  };

  // Tính toán nhanh số liệu thống kê cho Dashboard Panel (Độ dài số lượng cụ thể)
  const totalItems = products.length;
  const outOfStockItems = products.filter(p => !p.inStock || p.stockPercentage === 0).length;
  const lowStockItems = products.filter(p => p.inStock && p.stockPercentage > 0 && p.stockPercentage <= 10).length;
  const totalInventoryValue = products.reduce((acc, p) => acc + (p.price * p.stockPercentage), 0);

  return (
    <div className="inventory-page">
      <div className="container inventory-container">
        
        {/* Dashboard Header */}
        <div className="inventory-header">
          <div className="header-info">
            <h1 className="inventory-title">Quản Lý Kho Hàng</h1>
            <p className="inventory-subtitle">Xem, thêm, sửa, xóa sản phẩm và giám sát tồn kho NovaTech</p>
          </div>
          <button className="btn-add-product" onClick={handleAddClick}>
            <Plus size={20} />
            <span>Thêm sản phẩm mới</span>
          </button>
        </div>

        {/* Thẻ Thống Kê Nhanh (Counters Panel) */}
        <div className="inventory-counters-grid">
          <div className="counter-card card-blue">
            <div className="counter-icon-wrapper">
              <Package size={24} />
            </div>
            <div className="counter-data">
              <span className="counter-num">{totalItems}</span>
              <span className="counter-lbl">Dòng sản phẩm</span>
            </div>
          </div>

          <div className="counter-card card-orange">
            <div className="counter-icon-wrapper">
              <AlertTriangle size={24} />
            </div>
            <div className="counter-data">
              <span className="counter-num">{lowStockItems}</span>
              <span className="counter-lbl">Sắp hết hàng (&le;10 chiếc)</span>
            </div>
          </div>

          <div className="counter-card card-red">
            <div className="counter-icon-wrapper">
              <X size={24} />
            </div>
            <div className="counter-data">
              <span className="counter-num">{outOfStockItems}</span>
              <span className="counter-lbl">Sản phẩm hết hàng</span>
            </div>
          </div>

          <div className="counter-card card-green">
            <div className="counter-icon-wrapper">
              <Coins size={24} />
            </div>
            <div className="counter-data">
              <span className="counter-num">{formatPrice(totalInventoryValue)}</span>
              <span className="counter-lbl">Ước tính giá trị tồn kho</span>
            </div>
          </div>
        </div>

        {/* Thanh Lọc Dữ Liệu & Tìm Kiếm */}
        <div className="inventory-filters-bar">
          <div className="filter-search-input">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Tìm kiếm theo ID, tên hoặc danh mục..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-dropdowns-group">
            <div className="filter-select-wrapper">
              <FolderOpen size={16} />
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">Tất cả danh mục</option>
                <option value="Laptops">Laptops</option>
                <option value="Phones">Phones</option>
                <option value="Audio">Audio</option>
                <option value="Wearables">Wearables</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div className="filter-select-wrapper">
              <Filter size={16} />
              <select 
                value={selectedStockStatus} 
                onChange={(e) => setSelectedStockStatus(e.target.value)}
              >
                <option value="All">Tất cả trạng thái kho</option>
                <option value="Ok">Tồn kho an toàn (&gt;10 chiếc)</option>
                <option value="Low">Sắp hết hàng (&le;10 chiếc)</option>
                <option value="Out">Hết hàng (0 chiếc)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bảng Dữ Liệu Sản Phẩm */}
        {isLoading ? (
          <div className="inventory-loading">
            <div className="inventory-spinner"></div>
            <p>Đang tải danh sách hàng hóa tồn kho...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="inventory-empty-state">
            <Package size={64} className="empty-icon" />
            <h3>Không tìm thấy sản phẩm nào</h3>
            <p>Vui lòng thử thay đổi bộ lọc tìm kiếm hoặc tạo sản phẩm mới.</p>
          </div>
        ) : (
          <div className="inventory-table-container">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Danh mục</th>
                  <th>Giá gốc / Bán lẻ</th>
                  <th>Tồn kho</th>
                  <th style={{ textAlign: 'center' }}>Trạng thái</th>
                  <th style={{ textAlign: 'center' }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => {
                  const isOutOfStock = !p.inStock || p.stockPercentage === 0;
                  const isLowStock = p.inStock && p.stockPercentage > 0 && p.stockPercentage <= 20;

                  return (
                    <tr key={p.id}>
                      <td className="td-product">
                        <img src={p.image} alt={p.name} className="product-thumbnail" />
                        <div className="product-info-cell">
                          <span className="cell-product-name">{p.name}</span>
                          <span className="cell-product-id">ID: {p.id}</span>
                        </div>
                      </td>
                      <td>
                        <span className="cell-category-badge">{p.category}</span>
                      </td>
                      <td>
                        <div className="price-cell">
                          <span className="cell-price-current">{formatPrice(p.price)}</span>
                          {p.originalPrice && (
                            <span className="cell-price-original">{formatPrice(p.originalPrice)}</span>
                          )}
                        </div>
                      </td>
                      <td className="td-stock">
                        <div className="stock-cell-wrapper">
                          <div className="stock-numbers">
                            <span>{p.stockPercentage} chiếc</span>
                          </div>
                          <div className="stock-progress-bg">
                            <div 
                              className={`stock-progress-bar ${isOutOfStock ? 'bg-red' : isLowStock ? 'bg-orange' : 'bg-green'}`} 
                              style={{ width: `${Math.min((p.stockPercentage / 100) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {isOutOfStock ? (
                          <span className="status-label label-red">Hết hàng</span>
                        ) : isLowStock ? (
                          <span className="status-label label-orange">Sắp hết</span>
                        ) : (
                          <span className="status-label label-green">Còn hàng</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div className="action-buttons-group">
                          <button 
                            className="btn-action edit" 
                            onClick={() => handleEditClick(p)}
                            title="Sửa sản phẩm"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            className="btn-action delete" 
                            onClick={() => handleDeleteClick(p)}
                            title="Xóa sản phẩm"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ==========================================================================
           MODAL THÊM / SỬA SẢN PHẨM (Form Modal)
           ========================================================================== */}
        {isFormModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content form-modal">
              <div className="modal-header">
                <h3>{currentProduct ? 'Cập Nhật Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h3>
                <button className="btn-close-modal" onClick={() => setIsFormModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="modal-body modal-form-body">
                {/* 1. Phần Thông Tin Cơ Bản */}
                <div className="form-section">
                  <h4 className="section-title">Thông tin cơ bản</h4>
                  <div className="form-grid-2">
                    <div className="form-field">
                      <label>ID sản phẩm (Tự sinh nếu thêm mới)</label>
                      <input 
                        type="text" 
                        value={formId} 
                        onChange={(e) => setFormId(e.target.value)}
                        disabled={currentProduct !== null}
                        placeholder="Ví dụ: p1 (không trùng lặp)"
                      />
                    </div>
                    <div className="form-field">
                      <label>Tên sản phẩm *</label>
                      <input 
                        type="text" 
                        value={formName} 
                        onChange={(e) => setFormName(e.target.value)}
                        required
                        placeholder="Nhập tên sản phẩm..."
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-field">
                      <label>Giá bán lẻ (VND) *</label>
                      <input 
                        type="number" 
                        value={formPrice === 0 ? '' : formPrice} 
                        onChange={(e) => setFormPrice(Number(e.target.value))}
                        required
                        placeholder="Nhập giá bán..."
                      />
                    </div>
                    <div className="form-field">
                      <label>Giá gốc trước khi giảm (VND)</label>
                      <input 
                        type="number" 
                        value={formOriginalPrice === undefined ? '' : formOriginalPrice} 
                        onChange={(e) => setFormOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                        placeholder="Nhập giá gốc..."
                      />
                    </div>
                  </div>

                  <div className="form-grid-3">
                    <div className="form-field">
                      <label>Danh mục</label>
                      <select value={formCategory} onChange={(e) => setFormCategory(e.target.value)}>
                        <option value="Laptops">Laptops</option>
                        <option value="Phones">Phones</option>
                        <option value="Audio">Audio</option>
                        <option value="Wearables">Wearables</option>
                        <option value="Accessories">Accessories</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label>Số lượng tồn kho (chiếc)</label>
                      <input 
                        type="number" 
                        min="0" 
                        value={formStockPercentage} 
                        onChange={(e) => setFormStockPercentage(Number(e.target.value))}
                      />
                    </div>
                    <div className="form-field checkbox-field">
                      <label className="switch-container">
                        <input 
                          type="checkbox" 
                          checked={formInStock} 
                          onChange={(e) => setFormInStock(e.target.checked)}
                        />
                        <span className="switch-slider"></span>
                      </label>
                      <span className="switch-lbl">Bán công khai (Còn hàng)</span>
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Ảnh hiển thị chính (URL)</label>
                    <div className="input-with-icon">
                      <Image size={16} />
                      <input 
                        type="text" 
                        value={formImage} 
                        onChange={(e) => setFormImage(e.target.value)}
                        placeholder="Nhập URL hình ảnh chính từ Unsplash..."
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Mô tả chi tiết</label>
                    <textarea 
                      rows={4} 
                      value={formDescription} 
                      onChange={(e) => setFormDescription(e.target.value)}
                      placeholder="Mô tả các thông số nổi bật và thiết kế..."
                    />
                  </div>
                </div>

                {/* 2. Quản Lý Bộ Sưu Tập Ảnh Phụ (images list) */}
                <div className="form-section">
                  <h4 className="section-title">Bộ sưu tập ảnh phụ chi tiết</h4>
                  <div className="list-adder-group">
                    <input 
                      type="text" 
                      placeholder="Dán link ảnh phụ từ Unsplash..."
                      value={newImageLink}
                      onChange={(e) => setNewImageLink(e.target.value)}
                    />
                    <button type="button" onClick={handleAddImage}>
                      <Plus size={16} />
                      <span>Thêm</span>
                    </button>
                  </div>
                  {formImages.length > 0 && (
                    <div className="images-list-grid">
                      {formImages.map((img, index) => (
                        <div key={index} className="image-item-card">
                          <img src={img} alt="preview" />
                          <button type="button" className="btn-remove" onClick={() => handleRemoveImage(index)}>
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 3. Quản Lý Các Tính Năng Nổi Bật (Features) */}
                <div className="form-section">
                  <h4 className="section-title">Tính năng nổi bật</h4>
                  <div className="list-adder-group">
                    <input 
                      type="text" 
                      placeholder="Nhập một tính năng đặc biệt (ví dụ: Vi xử lý Nova M3 thế hệ mới)..."
                      value={newFeatureText}
                      onChange={(e) => setNewFeatureText(e.target.value)}
                    />
                    <button type="button" onClick={handleAddFeature}>
                      <Plus size={16} />
                      <span>Thêm</span>
                    </button>
                  </div>
                  {formFeatures.length > 0 && (
                    <ul className="features-list-editor">
                      {formFeatures.map((feat, index) => (
                        <li key={index}>
                          <span>{feat}</span>
                          <button type="button" onClick={() => handleRemoveFeature(index)}>
                            <X size={14} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* 4. Quản Lý Thông Số Kỹ Thuật (Specs) */}
                <div className="form-section">
                  <h4 className="section-title">Thông số kỹ thuật</h4>
                  <div className="spec-adder-fields">
                    <input 
                      type="text" 
                      placeholder="Tên thông số (e.g. RAM, SSD, Vi xử lý)"
                      value={newSpecKey}
                      onChange={(e) => setNewSpecKey(e.target.value)}
                    />
                    <input 
                      type="text" 
                      placeholder="Giá trị (e.g. 16GB, 512GB, M3 Core)"
                      value={newSpecVal}
                      onChange={(e) => setNewSpecVal(e.target.value)}
                    />
                    <button type="button" onClick={handleAddSpec}>
                      <Check size={16} />
                      <span>Ghi</span>
                    </button>
                  </div>
                  {Object.keys(formSpecs).length > 0 && (
                    <div className="specs-list-editor">
                      {Object.entries(formSpecs).map(([key, val]) => (
                        <div key={key} className="spec-editor-row">
                          <span className="spec-editor-key">{key}:</span>
                          <span className="spec-editor-value">{val}</span>
                          <button type="button" onClick={() => handleRemoveSpec(key)}>
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn-cancel" onClick={() => setIsFormModalOpen(false)}>
                    Hủy bỏ
                  </button>
                  <button type="submit" className="btn-save">
                    Lưu sản phẩm
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==========================================================================
           MODAL CẢNH BÁO XÓA SẢN PHẨM (Delete Confirm Modal)
           ========================================================================== */}
        {isDeleteModalOpen && productToDelete && (
          <div className="modal-overlay">
            <div className="modal-content delete-modal">
              <div className="modal-header header-danger">
                <h3>Xác Nhận Xóa Sản Phẩm</h3>
                <button className="btn-close-modal" onClick={() => setIsDeleteModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body delete-modal-body">
                <div className="danger-icon-large">
                  <Trash2 size={40} />
                </div>
                <h4>Bạn có chắc chắn muốn xóa vĩnh viễn sản phẩm này?</h4>
                <p className="delete-warning-text">
                  Hành động này sẽ xóa sản phẩm **"{productToDelete.name}"** ra khỏi cơ sở dữ liệu H2 và **không thể hoàn tác**.
                </p>
                <div className="delete-product-details-badge">
                  <img src={productToDelete.image} alt={productToDelete.name} />
                  <div>
                    <strong>{productToDelete.name}</strong>
                    <span>ID: {productToDelete.id} - Giá: {formatPrice(productToDelete.price)}</span>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-cancel" onClick={() => setIsDeleteModalOpen(false)}>
                  Không, giữ lại
                </button>
                <button className="btn-confirm-delete" onClick={handleConfirmDelete}>
                  Đồng ý, xóa vĩnh viễn
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Inventory;
