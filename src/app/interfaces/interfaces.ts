export interface ImagesFranchise {
  alt: string;
  src: string;
  width: number;
  height: number;
  showPay: boolean;
  bin?: number[];
}

export interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}

export interface ControllerProps {
  control: any;
  required?: boolean;
  name: string;
  props?: object;
  errors?: any;
}

export interface ObjectList {
  id: string | number;
  value: string | number;
}
