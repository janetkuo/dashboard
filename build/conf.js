// Copyright 2015 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Common configuration constants used in other build/test files.
 */
import path from 'path';

/**
 * Base path for all other paths.
 */
const basePath = path.join(__dirname, '../');

/**
 * Compilation architecture configuration.
 */
const arch = {
  /**
   * Default architecture that the project is compiled to. Used for local development and testing.
   * TODO(bryk): Dynamically determine this based on current arch.
   */
  default: 'amd64',
  /**
   * List of all supported architectures by this project.
   */
  list: ['amd64', 'arm', 'arm64', 'ppc64le'],
};

/**
 * Package version information.
 */
const version = {
  /**
   * Current release version of the project.
   */
  release: 'v1.0.0',
  /**
   * Version name of the canary release of the project.
   */
  canary: 'canary',
};

/**
 * Base name for the docker image.
 */
const imageNameBase = 'gcr.io/google_containers/kubernetes-dashboard';

/**
 * Exported configuration object with common constants used in build pipeline.
 */
export default {
  /**
   * Backend application constants.
   */
  backend: {
    /**
     * The name of the backend binary.
     */
    binaryName: 'dashboard',
    /**
     * Name of the main backend package that is used in go build command.
     */
    packageName: 'github.com/kubernetes/dashboard',
    /**
     * Port number of the backend server. Only used during development.
     */
    devServerPort: 9091,
    /**
    * Address for the Kubernetes API server.
    */
    apiServerHost: 'http://localhost:8080',
    /**
     * Address for the Heapster API server. If blank, the dashboard
     * will attempt to connect to Heapster via a service proxy.
     */
    heapsterServerHost: 'http://localhost:8082',
  },

  /**
   * Project compilation architecture info.
   */
  arch: arch,

  /**
   * Deployment constants configuration.
   */
  deploy: {
    /**
     * Project version info.
     */
    version: version,

    /**
     * Image name for the canary release for current architecture.
     */
    canaryImageName: `${imageNameBase}-${arch.default}:${version.canary}`,

    /**
     * Image name for the versioned release for current architecture.
     */
    releaseImageName: `${imageNameBase}-${arch.default}:${version.release}`,

    /**
     * Image name for the canary release for all supported architecture.
     */
    canaryImageNames: arch.list.map((arch) => `${imageNameBase}-${arch}:${version.canary}`),

    /**
     * Image name for the versioned release for all supported architecture.
     */
    releaseImageNames: arch.list.map((arch) => `${imageNameBase}-${arch}:${version.release}`),
  },

  /**
   * Frontend application constants.
   */
  frontend: {
    /**
    * Port number to access the dashboard UI
    */
    serverPort: 9090,
    /**
     * The name of the root Angular module, i.e., the module that bootstraps the application.
     */
    rootModuleName: 'kubernetesDashboard',
  },

  /**
   * Configuration for tests.
   */
  test: {
    /**
     * Whether to use sauce labs for running tests that require a browser.
     */
    useSauceLabs:
        !!process.env.SAUCE_USERNAME && !!process.env.SAUCE_ACCESS_KEY && !!process.env.TRAVIS,
  },

  /**
   * Absolute paths to known directories, e.g., to source directory.
   */
  paths: {
    app: path.join(basePath, 'src/app'),
    assets: path.join(basePath, 'src/app/assets'),
    base: basePath,
    backendSrc: path.join(basePath, 'src/app/backend'),
    backendTest: path.join(basePath, 'src/test/backend'),
    backendTmp: path.join(basePath, '.tmp/backend'),
    backendTmpSrc: path.join(basePath, '.tmp/backend/src/github.com/kubernetes/dashboard'),
    bowerComponents: path.join(basePath, 'bower_components'),
    build: path.join(basePath, 'build'),
    coverage: path.join(basePath, 'coverage'),
    coverageReport: path.join(basePath, 'coverage/lcov'),
    deploySrc: path.join(basePath, 'src/deploy'),
    dist: path.join(basePath, 'dist', arch.default),
    distCross: arch.list.map((arch) => path.join(basePath, 'dist', arch)),
    distPublic: path.join(basePath, 'dist', arch.default, 'public'),
    distPublicCross: arch.list.map((arch) => path.join(basePath, 'dist', arch, 'public')),
    distRoot: path.join(basePath, 'dist'),
    externs: path.join(basePath, 'src/app/externs'),
    frontendSrc: path.join(basePath, 'src/app/frontend'),
    frontendTest: path.join(basePath, 'src/test/frontend'),
    goTools: path.join(basePath, '.tools/go'),
    goWorkspace: path.join(basePath, '.go_workspace'),
    hyperkube: path.join(basePath, 'build/hyperkube.sh'),
    integrationTest: path.join(basePath, 'src/test/integration'),
    karmaConf: path.join(basePath, 'build/karma.conf.js'),
    nodeModules: path.join(basePath, 'node_modules'),
    partials: path.join(basePath, '.tmp/partials'),
    prodTmp: path.join(basePath, '.tmp/prod'),
    protractorConf: path.join(basePath, 'build/protractor.conf.js'),
    serve: path.join(basePath, '.tmp/serve'),
    src: path.join(basePath, 'src'),
    tmp: path.join(basePath, '.tmp'),
  },
};
