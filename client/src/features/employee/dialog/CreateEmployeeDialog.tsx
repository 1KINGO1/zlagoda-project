import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from 'sonner';
import {ApiError} from '@/shared/types/ApiError';
import {EmployeeSchema, EmployeeSchemaType} from '@/shared/schemas/Employee.schema';
import {useEffect} from 'react';
import {useCreateEmployee} from '@/shared/hooks/employee/useCreateEmployee';
import {EmployeeForm} from '@/features/employee/EmployeeForm';
import {useEmployeeModal} from '@/features/employee/context/EmployeeModals.context';

export const CreateEmployeeDialog = () => {
	const {closeModal, modal} = useEmployeeModal();

	const minBirthDate = new Date();
	minBirthDate.setFullYear(new Date().getFullYear() - 18);

	const form = useForm<EmployeeSchemaType>({
		defaultValues: {
			empl_surname: "",
			empl_name: "",
			salary: 0,
			date_of_birth: minBirthDate,
			date_of_start: new Date(),
			phone_number: "",
			city: "",
			street: "",
			zip_code: "",
			login: "",
			password: "",
		},
		mode: "onChange",
		resolver: zodResolver(EmployeeSchema)
	})
	const {mutateAsync: createEmployee} = useCreateEmployee();

	const submitHandler = async (data: EmployeeSchemaType) => {
		try {
			const employee = await createEmployee(data);
			toast.success(`Employee "${employee.login}" created successfully`);
			form.reset();
			closeModal();
		}
		catch (e) {
			const error = e as ApiError;
			toast.error(error.message);
		}
	}

	useEffect(() => {
		const surname = form.watch("empl_surname");
		const name = form.watch("empl_name");
		const role = form.watch("empl_role");

		console.log(form.getValues());

		if (!surname || !name || !role) {
			return;
		}

		form.setValue("login", `${role.toLowerCase()}-${surname.toLowerCase()}-${name.toLowerCase()}`);
	}, [
		form.watch("empl_surname"),
		form.watch("empl_name"),
		form.watch("empl_role")
	]);

	return (
		<Dialog modal={false} open={modal === "add"} onOpenChange={() => {
			closeModal();
		}}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create employee</DialogTitle>
				</DialogHeader>
				<EmployeeForm
					form={form}
					submitHandler={submitHandler}
					submitButtonText={"Create"}
				/>
			</DialogContent>
		</Dialog>
	);
}