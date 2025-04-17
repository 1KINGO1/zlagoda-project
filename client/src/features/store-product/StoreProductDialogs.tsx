'use client'

import {DeleteStoreProductDialog} from './dialog/DeleteStoreProductDialog';
import {EditStoreProductDialog} from './dialog/EditStoreProductDialog';
import {Button} from '@/components/ui/button';
import {CirclePlus} from 'lucide-react';
import {useStoreProductModal} from '@/features/store-product/context/StoreProductModals.context';
import {CreateStoreProductDialog} from '@/features/store-product/dialog/CreateStoreProductDialog';

export const StoreProductDialogs = () => {
	const {storeProduct, openModal} = useStoreProductModal();

	return (
		<>
			{storeProduct !== undefined && (
				<>
					<EditStoreProductDialog/>
					<DeleteStoreProductDialog/>
				</>
			)}

			<CreateStoreProductDialog />

			<div className="fixed bottom-8 right-8">
				<Button className="w-12 h-12" onClick={() => openModal("add", undefined)}>
					<CirclePlus/>
				</Button>
			</div>
		</>
	)
}