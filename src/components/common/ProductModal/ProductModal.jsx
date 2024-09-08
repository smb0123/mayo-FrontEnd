import styles from './ProductModal.module.scss';
import { useState, useEffect, useRef } from 'react';

export default function Modal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  newProduct,
  handleInputChange,
  handleImageChange,
}) {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [validationErrors, setValidationErrors] = useState({
    itemName: '',
    itemDescription: '',
    originalPrice: '',
    salePrice: '',
    salePercent: '',
    cookingTime: '',
  });

  useEffect(() => {
    if (newProduct) {
      if (typeof newProduct.itemImage === 'string') {
        setImagePreview(newProduct.itemImage);
      } else if (newProduct.itemImage instanceof File) {
        setImagePreview(URL.createObjectURL(newProduct.itemImage));
      } else {
        setImagePreview(null);
      }
    }
  }, [newProduct]);

  if (!isOpen) return null;

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const validateInputs = () => {
    let errors = {};

    if (!newProduct.itemName.trim()) {
      errors.itemName = '상품명을 입력해주세요.';
    } else if (newProduct.itemName.length > 15) {
      errors.itemName = '상품명은 15자 이하로 입력해주세요.';
    }

    if (!newProduct.itemDescription.trim()) {
      errors.itemDescription = '상품 설명을 입력해주세요.';
    } else if (newProduct.itemDescription.length > 200) {
      errors.itemDescription = '상품 설명은 200자 이하로 입력해주세요.';
    }

    if (!newProduct.originalPrice) {
      errors.originalPrice = '원래 가격을 입력해주세요.';
    }

    if (!newProduct.salePrice) {
      errors.salePrice = '할인 후 가격을 입력해주세요.';
    }

    if (!newProduct.salePercent) {
      errors.salePercent = '할인율을 입력해주세요.';
    }

    if (!newProduct.cookingTime) {
      errors.cookingTime = '조리 시간을 입력해주세요.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // 에러가 없으면 true 반환
  };

  const handleSave = () => {
    if (!validateInputs()) {
      alert('입력값을 확인해주세요.');
      return;
    }
    
    onSave();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>상품 관리</h2>
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.imageContainer} onClick={handleImageClick}>
            {imagePreview ? (
              <img src={imagePreview} alt="상품 이미지" />
            ) : (
              <div className={styles.uploadPlaceholder}>
                <span>+</span>
              </div>
            )}
            <input
              type="file"
              id="imageUpload"
              className={styles.imageUpload}
              onChange={handleImageChange}
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }} // 파일 입력을 숨김 처리
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="itemName">상품명</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={newProduct.itemName || ''}
              onChange={handleInputChange}
            />
            {validationErrors.itemName && <div className={styles.error}>{validationErrors.itemName}</div>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="itemDescription">상품 설명</label>
            <textarea
              id="itemDescription"
              name="itemDescription"
              value={newProduct.itemDescription || ''}
              onChange={handleInputChange}
            />
            {validationErrors.itemDescription && <div className={styles.error}>{validationErrors.itemDescription}</div>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="originalPrice">원래 가격</label>
            <input
              type="number"
              id="originalPrice"
              name="originalPrice"
              value={newProduct.originalPrice || ''}
              onChange={handleInputChange}
            />
            {validationErrors.originalPrice && <div className={styles.error}>{validationErrors.originalPrice}</div>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="salePrice">할인 후 가격</label>
            <input
              type="number"
              id="salePrice"
              name="salePrice"
              value={newProduct.salePrice || ''}
              onChange={handleInputChange}
            />
            {validationErrors.salePrice && <div className={styles.error}>{validationErrors.salePrice}</div>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="salePercent">할인율 (%)</label>
            <input
              type="number"
              id="salePercent"
              name="salePercent"
              value={newProduct.salePercent || ''}
              onChange={handleInputChange}
            />
            {validationErrors.salePercent && <div className={styles.error}>{validationErrors.salePercent}</div>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="itemQuantity">재고 수량</label>
            <input
              type="number"
              id="itemQuantity"
              name="itemQuantity"
              value={newProduct.itemQuantity || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="cookingTime">조리 시간 (분)</label>
            <input
              type="number"
              id="cookingTime"
              name="cookingTime"
              value={newProduct.cookingTime || ''}
              onChange={handleInputChange}
            />
            {validationErrors.cookingTime && <div className={styles.error}>{validationErrors.cookingTime}</div>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="additionalInformation">추가 정보</label>
            <input
              type="text"
              id="additionalInformation"
              name="additionalInformation"
              value={newProduct.additionalInformation || ''}
              onChange={handleInputChange}
            />

          </div>
        </div>

        <div className={styles.modalButtons}>
          <button onClick={onDelete} className={styles.deleteButton}>
            메뉴 삭제
          </button>
          <button onClick={handleSave} className={styles.saveButton}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
