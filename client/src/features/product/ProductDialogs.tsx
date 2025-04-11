'use client'

import {DeleteProductDialog} from './dialog/DeleteCategoryDialog';
import {EditProductDialog} from './dialog/EditProductDialog';
import {useProductModal} from '@/features/product/context/ProductModals.context';
import {Button} from '@/components/ui/button';
import {CirclePlus} from 'lucide-react';
import {CreateProductDialog} from '@/features/product/dialog/CreateProductDialog';

export const ProductDialogs = () => {
	const {product, openModal} = useProductModal();

	return (
		<>
			{product !== undefined && (
				<>
					<EditProductDialog/>
					<DeleteProductDialog/>
				</>
			)}

			<CreateProductDialog />

			<div className="fixed bottom-8 right-8">
				<Button className="w-12 h-12" onClick={() => openModal("add", undefined)}>
					<CirclePlus/>
				</Button>
			</div>
		</>
	)
}