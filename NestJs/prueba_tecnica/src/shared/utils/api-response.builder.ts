export class ApiResponseBuilder {
  static success(code: number, message: string, data: any) {
    return { status: 'success', code, message, data };
  }

  static error(code: number, message: string) {
    return { status: 'error', code, message, data: null };
  }
}
