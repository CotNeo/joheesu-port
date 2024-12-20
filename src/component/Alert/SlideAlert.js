import React, { useEffect } from 'react';
import styles from './SlideAlert.module.scss';
import useMobileDetection from '../../hooks/useMobileDetection';

function SlideAlert({ direction, storageKey }) {
  const isMobile = useMobileDetection();

  const message = direction === 'vertical' ? 'Swipe up or down' : 'Swipe left or right';

  useEffect(() => {
    const hasSeenAlert = sessionStorage.getItem(storageKey);
    
    if (!hasSeenAlert) {
      sessionStorage.setItem(storageKey, 'true');
    }
  }, [storageKey]);

  if (!isMobile || sessionStorage.getItem(storageKey)) {
    return null;
  }

  return (
    <>
      <div className={styles.slideAlert}>
        {message}
      </div>
    </>
  );
}

export default SlideAlert;
