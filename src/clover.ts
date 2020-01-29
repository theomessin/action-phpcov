export interface ClassMetrics {
    "@complexity": number;
    "@elements": number;
    "@coveredelements": number;
    "@conditionals": number;
    "@coveredconditionals": number;
    "@statements": number;
    "@coveredstatements": number;
    "@coveredmethods": number;
    "@methods": number;
    "@testduration": number;
    "@testfailures": number;
    "@testpasses": number;
    "@testruns": number;
}

export interface FileMetrics extends ClassMetrics {
    "@classes": number;
    "@loc": number;
    "@ncloc": number;
}

export interface PackageMetrics extends FileMetrics {
    "@files": number;
}

export interface ProjectMetric extends PackageMetrics{
    "@packages": number;
}

export interface Line {
    "@num": number;
    "@type": string;
    "@complexity": number;
    "@count": number;
    "@falsecount": number;
    "@truecount": number;
    "@signature": string;
    "@testduration": number;
    "@testsuccess": boolean;
    "@visibility": string;
}

export interface Class {
    "@name": string;
    metric: ClassMetrics[];
}

export interface File {
    "@name": string;
    class: Class[];
    line: Line[];
    metric: FileMetrics[];
}

export interface Package {
    "@name": string;
    file: File[];
}

export interface Project {
    "@timestamp": number;
    metric: ProjectMetric[];
    package: Package[];
}

export interface Coverage {
    "@generated": number;
    project: Project[];
}

export interface Root {
    coverage: Coverage;
}
