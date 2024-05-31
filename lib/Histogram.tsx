/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useMemo } from "react";
import type { Attribute, DataSource, Filter } from "@sisense/sdk-data";
import type {
  BaseAxisStyleOptions,
  BaseStyleOptions,
  ValueToColorMap,
} from "@sisense/sdk-ui";
import { getDefaultThemeSettings, useExecuteQuery } from "@sisense/sdk-ui";
import { LoadingOverlay } from './common/loading-overlay';
import { useBuildQuery } from "./histogram/useBuildQuery";
import { FREQUENCY, useProcessResults } from "./histogram/useProcessResults";
import { HistogramChart } from "./HistogramChart";
import { useBuildMinMaxQuery } from "./histogram/useBuildMinMaxQuery";
import { useThemeContext } from "@sisense/sdk-ui";
import styles from './Histogram.module.css';

export interface HistogramStyleOptions
  extends BaseStyleOptions,
    BaseAxisStyleOptions {
  binCount?: number | "auto";
  barBorder?: boolean;
  binSizePrecision?: number;
  subtype?: "stacked" | "overlay";
}

export interface HistogramDataOptions {
  value: Attribute;
  category: Attribute[];
  seriesToColorMap?: ValueToColorMap;
}

export type HistogramProps = {
  dataSource?: DataSource;
  dataOptions: HistogramDataOptions;
  filters?: Filter[];
  styleOptions?: HistogramStyleOptions;
};

export const Histogram = ({
  dataSource,
  dataOptions,
  filters,
  styleOptions,
}: HistogramProps) => {
  const { themeSettings } = useThemeContext();

  // Widget plug-in buildQuery: get min max count per category
  const minMaxQueryProps = useBuildMinMaxQuery({ dataSource, dataOptions, filters })

  const {
    data: minMaxData,
    isLoading: isMinMaxLoading,
    error: isMinMaxError,
  } = useExecuteQuery(minMaxQueryProps);

  // Widget plug-in buildQuery: get bin frequrency data per bin and cateogry
  const frequencyDataQueryProps = useBuildQuery({
    dataSource,
    minMaxData,
    dataOptions,
    filters,
    styleOptions,
  });

  const {
    data: binData,
    isLoading,
    error,
  } = useExecuteQuery(frequencyDataQueryProps);

  // Widget plug-in processResults: create histogram frequency data
  const histogramData = useProcessResults({ binData, dataOptions });

  // Widget plug-in render: render chart with histogram data
  const histogramChartDataOptions = useMemo(
    () => ({
      bins: dataOptions.value,
      frequency: { name: FREQUENCY },
      breakBy: dataOptions.category,
      seriesToColorMap: dataOptions.seriesToColorMap,
    }),
    [dataOptions.value, dataOptions.seriesToColorMap, dataOptions.category]
  );

  if (isMinMaxError) return <div>{`${isMinMaxError}`}</div>;
  if (error) return <div>{`${error}`}</div>;
  const panelBackgroundColor = themeSettings?.chart.panelBackgroundColor
    ? themeSettings.chart.panelBackgroundColor
    : 'white';
  return (
    <LoadingOverlay themeSettings={themeSettings} isVisible={isMinMaxLoading || isLoading}>
      {binData && (
        <HistogramChart
          dataSet={histogramData}
          dataOptions={histogramChartDataOptions}
          styleOptions={styleOptions}
        />
      )}
      {!binData && (
        <div
        className={styles.histogramEmptyArea}
        style={{
          backgroundColor: `${panelBackgroundColor}`,
        }}
        ></div>
      )}
    </LoadingOverlay>
  );
};
