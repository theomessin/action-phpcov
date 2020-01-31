/**
 * The root of a parsed Clover.xml file.
 * Parsing must be done using the **xml2js** package.
 */
export default interface CloverXml {
    coverage: Coverage;
};

export interface Coverage {
    project: Project[];
};

export interface Project {
    metrics: ProjectMetrics[];
    package: Package[];
};

export interface Package {
    file: File[];
};

export interface File {
    class: Class[];
    line: Line[];
    metrics: FileMetrics[];
};

export interface Class {
    metrics: ClassMetrics[];
};

export interface Line {
    
};

export interface ProjectMetrics {
    "$": ProjectMetricsAttributes;
};

export interface PackageMetrics {
    "$": PackageMetricsAttributes;
};

export interface FileMetrics {
    "$": FileMetricsAttributes;
};

export interface ClassMetrics {
    "$": ClassMetricsAttributes;
};

export interface ProjectMetricsAttributes extends PackageMetricsAttributes {
    packages: number;
};

export interface PackageMetricsAttributes extends FileMetricsAttributes {
    files: number;
};

export interface FileMetricsAttributes extends ClassMetricsAttributes {
    classes: number;
    loc: number;
    ncloc: number;
};

export interface ClassMetricsAttributes {
    complexity: number;
    elements: number;
    coveredelements: number; 
    conditionals: number;
    coveredconditionals: number;
    statements: number;
    coveredstatements: number;
    coveredmethods: number;
    methods: number;
    testduration: number;
    testfailures: number;
    testpasses: number;
    testruns: number;
};
