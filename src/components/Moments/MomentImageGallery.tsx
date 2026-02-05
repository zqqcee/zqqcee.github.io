import { useEffect, useRef } from 'react';
import type { MomentImage } from '@/types/moment';
import mediumZoom from 'medium-zoom';

interface MomentImageGalleryProps {
	images: MomentImage[];
}

export default function MomentImageGallery({ images }: MomentImageGalleryProps) {
	const galleryRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!galleryRef.current) return;

		const imgs = galleryRef.current.querySelectorAll('img');
		const zoom = mediumZoom(imgs, {
			margin: 24,
			background: 'rgba(0, 0, 0, 0.9)',
			scrollOffset: 0,
		});

		// 检测是否为 iOS 设备
		const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

		if (isIOS) {
			let originalStyles: Record<string, string> = {};
			let currentImg: HTMLImageElement | null = null;

			zoom.on('open', () => {
				const img = zoom.getZoomedImage() as HTMLImageElement | null;
				if (img) {
					currentImg = img;
					originalStyles = {
						width: img.style.width,
						height: img.style.height,
						maxWidth: img.style.maxWidth,
						maxHeight: img.style.maxHeight,
						left: img.style.left,
						top: img.style.top,
						transform: img.style.transform,
						zoom: img.style.zoom,
					};

					img.style.setProperty('zoom', '1', 'important');

					const imgWidth = img.naturalWidth;
					const imgHeight = img.naturalHeight;
					const aspectRatio = imgWidth / imgHeight;

					const maxWidth = window.innerWidth - 48;
					const maxHeight = window.innerHeight - 48;

					let finalWidth, finalHeight;
					if (imgWidth / maxWidth > imgHeight / maxHeight) {
						finalWidth = maxWidth;
						finalHeight = maxWidth / aspectRatio;
					} else {
						finalHeight = maxHeight;
						finalWidth = maxHeight * aspectRatio;
					}

					requestAnimationFrame(() => {
						img.style.setProperty('width', `${finalWidth}px`, 'important');
						img.style.setProperty('height', `${finalHeight}px`, 'important');
						img.style.setProperty('max-width', 'none', 'important');
						img.style.setProperty('max-height', 'none', 'important');
						img.style.setProperty('left', `${(window.innerWidth - finalWidth) / 2}px`, 'important');
						img.style.setProperty(
							'top',
							`${(window.innerHeight - finalHeight) / 2}px`,
							'important',
						);
						img.style.setProperty('transform', 'none', 'important');
					});
				}
			});

			zoom.on('closed', () => {
				if (currentImg) {
					currentImg.style.width = originalStyles.width || '';
					currentImg.style.height = originalStyles.height || '';
					currentImg.style.maxWidth = originalStyles.maxWidth || '';
					currentImg.style.maxHeight = originalStyles.maxHeight || '';
					currentImg.style.left = originalStyles.left || '';
					currentImg.style.top = originalStyles.top || '';
					currentImg.style.transform = originalStyles.transform || '';
					currentImg.style.zoom = originalStyles.zoom || '';
					currentImg = null;
				}
			});
		}

		return () => {
			zoom.detach();
		};
	}, [images]);

	if (images.length === 0) return null;

	// 根据图片数量确定网格布局
	const getGridClass = () => {
		if (images.length === 1) return 'grid-cols-1';
		if (images.length === 2 || images.length === 4) return 'grid-cols-2';
		return 'grid-cols-3';
	};

	// 单张图片时保持原始比例
	const isSingleImage = images.length === 1;

	return (
		<div ref={galleryRef} className={`mt-4 grid gap-2 ${getGridClass()}`}>
			{images.slice(0, 9).map((image, idx) => (
				<div
					key={idx}
					className={`overflow-hidden rounded-lg bg-gray-800 ${
						isSingleImage ? 'max-w-md' : 'aspect-square'
					}`}
					style={
						isSingleImage
							? {
									aspectRatio: `${image.width}/${image.height}`,
									maxHeight: '400px',
								}
							: undefined
					}
				>
					<img
						src={image.url}
						alt={`Image ${idx + 1}`}
						loading="lazy"
						className="h-full w-full cursor-zoom-in object-cover transition-transform duration-300 hover:scale-105"
					/>
				</div>
			))}
			{images.length > 9 && (
				<div className="flex aspect-square items-center justify-center rounded-lg bg-gray-800/50 text-gray-400">
					+{images.length - 9}
				</div>
			)}
		</div>
	);
}
