import { StageData, Stage01 } from "./stages/stage01";

export class Stage{
    stageNumber: number;
    id: string;
    name: string;
    constructor(stageData: StageData) {
        this.stageNumber = stageData.stageNumber;
        this.id = stageData.id;
        this.name = stageData.name;
    }
    static stages(stageId: string): Stage {
        switch(stageId) {
            case "glassland":
                 return new Stage(Stage01)
        }
    }
}