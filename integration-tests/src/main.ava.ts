import { Worker, NEAR, NearAccount } from 'near-workspaces';
import anyTest, { TestFn } from 'ava';

const test = anyTest as TestFn<{
  worker: Worker;
  accounts: Record<string, NearAccount>;
}>;

test.beforeEach(async (t) => {
  const worker = await Worker.init(); //--Iniciar el trabajo en un servidor de prueba
  
  const root = worker.rootAccount; //--Desplegar el contrato

  //--Cuentas de prueba
  const juanito = await root.createSubAccount("juanito", {
    initialBalance: NEAR.parse("10 N").toJSON(),
  });
  const patricio = await root.createSubAccount("patricio", {
    initialBalance: NEAR.parse("10 N").toJSON(),
  });
  const contract = await root.createSubAccount("contract", {
    initialBalance: NEAR.parse("30 N").toJSON(),
  });

  await contract.deploy(process.argv[2]); //--Obtenemos la ruta.

  t.context.worker = worker; //--Estados de la prueba
  t.context.accounts = { root, contract, juanito, patricio };
});

test.afterEach(async (t) => {
  await t.context.worker.tearDown().catch((error) => {
    console.log("Failed to stop the Sandbox:", error);
  });
});//--Acciones despues de cada prueba.

//--Pruebas unitarias.
test("Juanito completo exitosamente una puja de 1 credito", async (t) => {
  const { contract, juanito } = t.context.accounts;
  await juanito.call(contract, "add_bid", { cantidad : 1 }, { attachedDeposit: NEAR.parse('1') });
  const msgs = await contract.view("total_bid");
  const expectedMessagesResult = "El total de pujas fue de: 1 con un valor de: 1 creditos.";
  t.is(msgs, expectedMessagesResult);
});
test("Juanito completo exitosamente una puja de 3 creditos", async (t) => {
  const { contract, juanito } = t.context.accounts;
  await juanito.call(contract, "add_bid", { cantidad : 3 }, { attachedDeposit: NEAR.parse('3') });
  const msgs = await contract.view("total_bid");
  const expectedMessagesResult = "El total de pujas fue de: 1 con un valor de: 3 creditos.";
  t.is(msgs, expectedMessagesResult);
});
test("Patricio no logro completar una puja porque le hacen falta creditos", async (t) => {
  const { contract, patricio } = t.context.accounts;
  await patricio.call(contract, "add_bid", { cantidad: 0 }, { attachedDeposit: NEAR.parse('0') });
  const totalBids = await contract.view("total_bid");
  t.is(totalBids, "El total de pujas fue de: 1 con un valor de: 0 creditos.");
});
