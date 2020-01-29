export interface Line {}

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
}

export interface FileMetricsAttributes extends ClassMetricsAttributes {
    classes: number;
    loc: number;
    ncloc: number;
}

export interface PackageMetricsAttributes extends FileMetricsAttributes {
    files: number;
}

export interface ProjectMetricsAttributes extends PackageMetricsAttributes {
    packages: number;
}

export interface ClassMetrics {
    "@": ClassMetricsAttributes;
}

export interface FileMetrics {
    "@": FileMetricsAttributes;
}

export interface PackageMetrics {
    "@": PackageMetricsAttributes;
}

export interface ProjectMetrics {
    "@": ProjectMetricsAttributes;
}

export interface Class {
    metrics: ClassMetrics[];
}

export interface File {
    class: Class[];
    line: Line[];
    metrics: FileMetrics[];
}

export interface Package {
    file: File[];
}

export interface Project {
    metrics: ProjectMetrics[];
    package: Package[];
}

export interface Coverage {
    project: Project[];
}

export interface Root {
    coverage: Coverage;
}
