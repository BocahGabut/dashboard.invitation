import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import Layout from "../Components/Layout";

const IconsI = dynamic(() => import('../Components/Utils/Icons'), { ssr: false })

const Home = () => {
  return (
    <>
      <Layout activeSidebar="home">
        <div className="row">
          <div className="col-md-4">
            <div className="card no-shadow border-border">
              <div className="card-body" style={{ padding: 0 }}>
                <div className="row">
                  <div className="col-md-12">
                    <div
                      className="position-relative bg-dark text-white"
                      style={{
                        paddingTop: '50%',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center top',
                        backgroundImage: `url(${'https://storage.wedew.id/uploads/public/639/882/b08/thumb_1994853_400_300_0_0_auto.png'})`
                      }}
                    >
                      <div
                        className="position-absolute shade p-3 d-flex align-items-end"
                        style={{ top: 0, left: 0, right: 0, bottom: 0 }}
                      >
                        <div style={{ zIndex: 2 }}>
                          <IconsI icons='fa fa-circle fa-fw text-success mr-2' />
                          <Link
                            href="https://testingwedding.wedew.id"
                            className="text-white font-weight-bold"
                            target="_blank"
                          >
                            testingwedding.wedew.id
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row no-gutters">
                      <div className="col">
                        <ul className="list-group list-group-flush">
                          <Link
                            href="https://dashboard.wedew.id/website/themes"
                            className="list-group-item list-group-item-action"
                          >
                            <div className="row no-gutters align-items-center">
                              <div className="col-auto">
                                <IconsI icons='fa fa-palette fa-fw text-muted mr-2' />
                              </div>
                              <div className="col">
                                Tema
                              </div>
                              <div className="col-auto mr-2">
                                <span className="badge badge-outline-secondary">Minimal Leafy Green</span>
                              </div>
                              <div className="col-auto">
                                <IconsI icons='fa fa-arrow-right fa-fw' />
                              </div>
                            </div>
                          </Link>
                          <Link
                            href="https://dashboard.wedew.id/website"
                            className="list-group-item list-group-item-action"
                          >
                            <div className="row no-gutters align-items-center">
                              <div className="col-auto">
                                <IconsI icons='fa fa-paint-brush fa-fw text-muted mr-2' />
                              </div>
                              <div className="col">
                                Ubah Tampilan
                              </div>
                              <div className="col-auto">
                                <IconsI icons='fa fa-arrow-right fa-fw' />
                              </div>
                            </div>
                          </Link>
                          <Link
                            href="https://dashboard.wedew.id/packages?mode=addon"
                            className="list-group-item list-group-item-action"
                          >
                            <div className="row no-gutters d-flex align-items-center">
                              <div className="col-auto">
                                <IconsI icons='fa fa-globe fa-fw text-muted mr-2' />
                              </div>
                              <div className="col">
                                Custom Domain <span className="badge badge-soft-info">.com</span>
                              </div>
                              <div className="col-auto">
                                <IconsI icons='fa fa-arrow-right fa-fw' />
                              </div>
                            </div>
                          </Link>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Home