import React from "react";
import InputDateRange from "../../Utils/inputDateRange";

const FormStep1 = ({judul,setDates,propsData}) => {
    return (
        <>
            <div>
                <div className="row mt-6">
                    <div className="col-md-12">
                        <div className="text-center">
                            <h2>Selamat Datang</h2>
                            <span>
                                Ceritakan pernikahanmu untuk membuat undangan yang unik dan berkesan.
                            </span>
                        </div>
                    </div>
                    <div className="col-md-12 mt-4">
                        <div>
                            <label>
                                Judul <span className="text-danger">*</span>
                            </label>
                            <input ref={judul} defaultValue={propsData.judul} type="text" required name="judul" className="form-control" />
                            <p className="text-muted m-0" style={{ fontSize: 11 }}>Contoh: Weni & Dewa</p>
                        </div>
                    </div>
                    <div className="col-md-12 mt-6">
                        <div>
                            <label>
                                Tanggal Pernikahan <span className="text-danger">*</span>
                            </label>
                            <InputDateRange defaultValue={propsData.tanggal} dates={(e) => setDates(e)} onFocus={(e) => { }} />
                            <p className="text-muted m-0" style={{ fontSize: 11 }}>Kosongi jika masih belum ditentukan</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormStep1