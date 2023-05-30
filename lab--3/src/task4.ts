import * as os from "os"
import * as systemInfo from "systeminformation";
import {mem} from "systeminformation";

export function monitor() {
    const interval = +process.argv[2] * 1000;
    if (isNaN(interval)) throw new Error("number required");
    const callback = async function () {
        console.log(`Operating system: ${os.version()}`)
        console.log(`Architecture: ${os.arch()}`)
        console.log(`Current user name: ${os.userInfo().username}`)
        os.cpus().forEach((cpu: os.CpuInfo) => console.log(cpu.model));
        const temperature = await systemInfo.cpuTemperature();
        console.log(`CPU temperature: ${temperature.main}`);

        const graphics = await systemInfo.graphics();
        console.log("Graphic controllers vendors and models:")
        graphics.controllers.forEach(controller => {
            console.log(`\t ${controller.vendor}`)
            console.log(`\t \t ${controller.model}`)
        });

        const memory = await systemInfo.mem();
        console.log("Total memory, used memory, free memory in GB: ")
        console.log(`\t ${memory.total/1073741824}`)
        console.log(`\t ${memory.used / 1073741824}`)
        console.log(`\t ${memory.free / 1073741824}`)

        const battery = await systemInfo.battery();

        console.log("Дані про батарею (charging, percent, remaining time): ")
        console.log(`\t ${battery.isCharging}`)
        console.log(`\t ${battery.percent}`)
        console.log(`\t ${battery.timeRemaining}`)


    }

    setInterval(callback, interval);
}