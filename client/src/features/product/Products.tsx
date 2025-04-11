'use client';

import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import {ProductFilter} from '@/features/product/ProductFilter';
import {useState} from 'react';
import {Product} from '@/shared/entities/Product';
import {ProductList} from '@/features/product/ProductList';
import {ProductDialogs} from '@/features/product/ProductDialogs';

export const Products = () => {
	return (
		<div>
			<ProductFilter />
			<Table className="mt-3">
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Product ID</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Category</TableHead>
						<TableHead className="text-right">Description</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<ProductList />
				</TableBody>
			</Table>
			<ProductDialogs />
		</div>
	)
}