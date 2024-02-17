export const POINT_ONE = '100000000000000000000000'; //1 NEAR 

export class MakeBid {
  puja: boolean; //Determina si se realiza o no la puja
  postor: string; 

  constructor({ puja, postor}: MakeBid) {
    this.puja = puja;
    this.postor = postor;
  }
}