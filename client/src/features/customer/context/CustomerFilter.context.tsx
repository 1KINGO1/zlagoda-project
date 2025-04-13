'use client';

import {createContext, PropsWithChildren, useContext, useState} from "react";

interface CustomerFilterContextType {
	customerSurname: string | undefined,
	setCustomerSurname: (surname: string | undefined) => void,
	percent: number | undefined,
	setPercent: (percent: number | undefined) => void,
	surnameSort: "ASC" | "DESC" | undefined,
	setSurnameSort: (sort: "ASC" | "DESC" | undefined) => void,
	clear: () => void,
}
export const CustomerFilterContext = createContext<CustomerFilterContextType>({
	customerSurname: undefined,
	setCustomerSurname: () => {},
	percent: undefined,
	setPercent: () => {},
	surnameSort: undefined,
	setSurnameSort: () => {},
	clear: () => undefined,
});

export const CustomerFilterProvider = ({children}: PropsWithChildren) => {
	const [customerSurname, setCustomerSurname] = useState<string | undefined>(undefined);
	const [percent, setPercent] = useState<number | undefined>(undefined);
	const [surnameSort, setSurnameSort] = useState<"ASC" | "DESC" | undefined>(undefined);

	const clear = () => {
		setCustomerSurname(undefined);
		setPercent(undefined);
		setSurnameSort(undefined);
	}

	return (
		<CustomerFilterContext.Provider value={{
			clear,
			customerSurname,
			setCustomerSurname,
			percent,
			setPercent,
			surnameSort,
			setSurnameSort,
		}}>
			{children}
		</CustomerFilterContext.Provider>
	)
}

export const useCustomerFilter = () => {
	const context = useContext(CustomerFilterContext);
	if (!context) {
		throw new Error("useCustomerFilter must be used within a CustomerFilterProvider");
	}
	return context;
}