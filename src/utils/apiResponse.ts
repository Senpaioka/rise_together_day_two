export type TMeta = {
    page?: number;
    limit?: number;
    total?: number;
    totalPage?: number;
};

export interface ApiResponse<T> {
    statusCode: number;
    success: boolean;
    message?: string;
    data?: T;
    meta?: TMeta;
}
