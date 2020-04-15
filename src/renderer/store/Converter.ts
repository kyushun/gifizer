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
import Config from "../../shared/config";
import {
  ConvertOptions,
  InspectionReport,
  ConvertReport
} from "../../shared/types";
import {
  INSPECT_FILE,
  CONVERT,
  CONVERT_CANCEL,
  CONVERT_REPORT
} from "../../shared/ipcs";
import { changeFileExtension } from "../util";

export interface ConverterStore {
  options: ConvertOptions;
  inspectReport: InspectionReport;
  report: ConvertReport;
}

ipcRenderer.on(INSPECT_FILE, (_: any, report: InspectionReport) => {
  ConverterModule.setInspectReport(report);
});

ipcRenderer.on(CONVERT_REPORT, (_: any, report: ConvertReport) => {
  ConverterModule.setReport(report);
});

@Module({ dynamic: true, store, name: "converter", namespaced: true })
class Converter extends VuexModule implements ConverterStore {
  options: ConvertOptions = {
    ...{ sourcePath: "", outputPath: "" },
    ...Config.convertOptions
  };
  inspectReport: InspectionReport = {
    error: null
  };
  report: ConvertReport = {
    status: null
  };

  get status() {
    return {
      isNull: this.report.status == null,
      isProcessing: this.report.status == "PROCESSING",
      isFinished: this.report.status == "FINISHED",
      isCancelled: this.report.status == "CANCELLED",
      isError: this.report.status == "ERROR"
    };
  }

  @Mutation
  setInspectReport(report: InspectionReport) {
    this.inspectReport = report;
  }

  @Mutation
  setReport(report: ConvertReport) {
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

  @Action({})
  cancel() {
    ipcRenderer.send(CONVERT_CANCEL);
  }

  @Action({})
  saveOptionsAsDefault() {
    const options = this.options;
    delete options.sourcePath;
    delete options.outputPath;
    Config.convertOptions = options;
  }

  @MutationAction({ mutate: ["options", "inspectReport", "report"] })
  async reset() {
    return {
      options: {
        ...{
          sourcePath: "",
          outputPath: ""
        },
        ...Config.convertOptions
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
