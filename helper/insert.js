import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const insertData = async (data) => {
  // Beispiel-Daten (1. Element aus deinem Array)

  try {
    // Daten in die Datenbank einfügen
    const insertedData = await prisma.lgPowerData.create({
      data: {
        pvPower: data.pvPower,
        gridPower: data.gridPower,
        loadPower: data.loadPower,
        batterySoc: data.battery.soc,
        batteryStatus: data.battery.nStatus,
        batteryPower: data.battery.power,
        batteryStrStatus: data.battery.status
      }
    });
    console.log('Data inserted:', insertedData);
  } catch (error) {
    console.error('Error inserting data:');
  } finally {
    await prisma.$disconnect();
  }
};

export {
    insertData
}