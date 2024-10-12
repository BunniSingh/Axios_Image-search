import React from 'react'
import styles from './ImageCard.module.css';
const ImageCard = ({props}) => {
  return (
    <div className={styles['image-container']}>
        <div className={styles.image}>
            <a target='_blank' href={props.links.download}>
                <img src={props.urls.regular} alt={props.alt_description} />
            </a>
        </div>
    </div>
  )
}

export default ImageCard