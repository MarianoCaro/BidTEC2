import { NearBindgen, near, call, view, Vector } from 'near-sdk-js';
import { POINT_ONE, MakeBid } from './model';

@NearBindgen({})
class Subasta {
  bids: Vector<MakeBid> = new Vector<MakeBid>("v-uid");
  totalx: number = 0; //--Acomulador del total de creditos

  @call({ payableFunction: true })
  add_bid( {cantidad} : {cantidad : number}): void {
    const deposit = near.attachedDeposit();
    //near.log("Deposito: ", deposit.toString()); -- Mensaje de consola para comprobar

    const puja = deposit >= BigInt(POINT_ONE);//--Determinar si hay una cantidad depositada
    const postor = near.predecessorAccountId();

    if (puja) {
      this.totalx += cantidad; 
    }//--Incrementar total si se cumplen los requisitos de la puja.

    const nuevaPuja: MakeBid = { puja, postor };
    this.bids.push(nuevaPuja);

    //near.log("Puja: ", JSON.stringify(this.bids)); -- Mensaje en la consola para comprobar
  }

  @view({})
  total_bid(): string {
    near.log("Intentos de puja: ", this.bids.length.toString());
    near.log("Total de creditos calculados: ", this.totalx.toString());
    near.log("El total de pujas fue de: " + this.bids.length + " con un valor de: " + this.totalx + " creditos.");
    return "El total de pujas fue de: " + this.bids.length + " con un valor de: " + this.totalx + " creditos.";
  }//--Muestra el resultado del total de casos en las pujas
}
