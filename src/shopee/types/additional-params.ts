import Primitive from './primitive';

type AdditionalParams = Record<string, Primitive | Primitive[]> & {
  accessToken?: string;
};

export default AdditionalParams;
