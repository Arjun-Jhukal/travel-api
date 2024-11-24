export enum ROLES {
	SUPER_ADMIN = "SUPER_ADMIN",
	ADMIN = "ADMIN",
	SUPERVISOR = "SUPERVISOR",
	CUSTOMER = "CUSTOMER",
}

export interface User {
	userId: number | string;
	name?: string;
	userRole: ROLES;
	email: string;
	password: string;
}
