export default function Page(){
	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl font-bold">Dashboard</h1>
			<p className="text-muted-foreground">
				This is a protected route. You can only see this page if you are logged in.
			</p>
		</div>
	);
}