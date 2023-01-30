import React from "react";

const FormStep2 = ({female_name,female_bio,female_instagram,male_name,male_bio,male_instagram,propsData}) => {
    return (
        <>
            <div>
                <div className="row mt-6">
                    <div className="col-md-12">
                        <div className="text-center">
                            <h2>Data Pasangan</h2>
                            <span>
                                Sudah tahu kan nikah sama siapa. Silakan diisi agar para tamu jadi lebih kenal.
                            </span>
                        </div>
                    </div>
                    <div className="col-md-12 mt-8">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h5>Calon Pengantin Wanita</h5>
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <div>
                                            <label>
                                                Nama
                                            </label>
                                            <input type="text" ref={female_name} defaultValue={(!propsData) ?  '' : propsData.female.name} name="female_name" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <div>
                                            <label>
                                                Bio
                                            </label>
                                            <textarea ref={female_bio} defaultValue={(!propsData) ?  '' : propsData.female.bio} name="female_bio" className="form-control" rows={3} />
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <div>
                                            <label>
                                                Username Instagram
                                            </label>
                                            <div className="input-group">
                                                <span className="input-group-text">@</span>
                                                <input ref={female_instagram} defaultValue={(!propsData) ?  '' : propsData.female.instagram} name="female_instagram" type="text" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h5>Calon Pengantin Pria</h5>
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <div>
                                            <label>
                                                Nama
                                            </label>
                                            <input ref={male_name} defaultValue={(!propsData) ?  '' : propsData.male.name} type="text" name="male_name" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <div>
                                            <label>
                                                Bio
                                            </label>
                                            <textarea ref={male_bio} defaultValue={(!propsData) ?  '' : propsData.male.bio} name="male_bio" className="form-control" rows={3} />
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <div>
                                            <label>
                                                Username Instagram
                                            </label>
                                            <div className="input-group">
                                                <span className="input-group-text">@</span>
                                                <input ref={male_instagram} defaultValue={(!propsData) ?  '' : propsData.male.instagram} name="male_instagram" type="text" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormStep2