import Vue from "vue";
import {
  Module,
  VuexModule,
  Mutation,
  Action,
  MutationAction,
  getModule
} from "vuex-module-decorators";
import { ipcRenderer } from "electron";
import store from ".";
import {
  IConvertOptions,
  IInspectionReport,
  IConvertReport
} from "../../shared/types";
import { INSPECT_FILE, CONVERT, CONVERT_REPORT } from "../../shared/ipcs";
import { changeFileExtension } from "../util";

export interface IConverter {
  options: IConvertOptions;
  inspectReport: IInspectionReport;
  report: IConvertReport;
}

ipcRenderer.on(INSPECT_FILE, (_: any, report: IInspectionReport) => {
  ConverterModule.setInspectReport(report);
});

ipcRenderer.on(CONVERT_REPORT, (_: any, report: IConvertReport) => {
  ConverterModule.setReport(report);
});

@Module({ dynamic: true, store, name: "converter", namespaced: true })
class Converter extends VuexModule implements IConverter {
  options: IConvertOptions = {
    sourcePath: "",
    outputPath: ""
  };
  inspectReport: IInspectionReport = {
    error: null
  };
  report: IConvertReport = {
    status: null
  };

  @Mutation
  setInspectReport(report: IInspectionReport) {
    this.inspectReport = report;
  }

  @Mutation
  setReport(report: IConvertReport) {
    this.report = report;
  }

  @Mutation
  setOptions(options: any) {
    for (const key in options) {
      Vue.set(this.options, key, options[key]);
    }
  }

  @Action({ commit: "setOptions" })
  setSourceFilePath(path: string) {
    ipcRenderer.send(INSPECT_FILE, path);

    return {
      sourcePath: path,
      outputPath: changeFileExtension(path, "gif")
    };
  }

  @Action({})
  convert() {
    this.setReport({
      status: "PROCESSING"
    });
    ipcRenderer.send(CONVERT, this.options);
  }

  @MutationAction({ mutate: ["options", "inspectReport", "report"] })
  async reset() {
    return {
      options: {
        sourcePath: "",
        outputPath: ""
      },
      inspectReport: {
        error: null
      },
      report: {
        status: null
      }
    };
  }
}

const ConverterModule = getModule(Converter);

export default ConverterModule;
