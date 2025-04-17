import {StoreProductsWrapper} from '@/features/store-product/StoreProductsWrapper';
import {StoreProducts} from '@/features/store-product/StoreProducts';

export default function Page() {
	return (
		<StoreProductsWrapper>
			<StoreProducts />
		</StoreProductsWrapper>
	);
}