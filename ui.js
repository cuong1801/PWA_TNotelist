const renderNote = (data) =>{
$("#name_notes").append(
            
    '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4"><div  class="card border-info mb-3" style="max-width: 30rem;"><div class="card-header"><h6 class="card-title"></h6></div><div class="card-body text-center"><p class="card-text">'+data.name+'</p> </div> <div class="card-footer text-center"> <button type="button" style="width: 60px;height: 40px;" class="btn btn-info" data-toggle="modal" data-target="#detailnotes">Xem</button></div></div></div><div class="modal" id="detailnotes"><div class="modal-dialog modal-lg"><div class="modal-content"><!-- Modal Header --><div class="modal-header"><h4 class="modal-title">'+data.name+'</h4><div><small>'+data.location+'</small><br><small>11 mins ago</small><small>Địa chỉ</small> </div> </div><!-- Modal body --><div class="modal-body">'+data.content+'</div><!-- Modal footer --><div class="modal-footer"><button type="button" style="width: 70px;height: 50px;" class="btn btn-outline-info">Sửa</button><button type="button" style="width: 70px;height: 50px;" class="btn btn-outline-info" data-toggle="modal" data-target="#XoaModal">Xóa</button>'
    +'<button type="button" style="width: 70px;height: 50px;" class="btn btn-outline-info" data-dismiss="modal">Thoát</button></div></div></div></div>'
    +'<div class="modal fade" id="XoaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">'
    +'<div class="modal-dialog" role="document">'
    +'<div class="modal-content">'
    +'<div class="modal-header">'
    +'<h5 class="modal-title" id="exampleModalLabel">Delete</h5>'
    +'<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
    +'<span class="material-icons" aria-hidden="true">help_outline</span>'
    +'</button>'
    +'</div>'
    +'<div class="modal-body"> <i class="material-icons"  >delete_forever</i>'
    +'Do you really  want to delete?'
    +'</div>'
    +'<div class="modal-footer">'
    +'<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
    +'<button type="button" class="btn btn-primary">Delete</button>'
    +'</div>'
    +'</div>'
    +'</div>'
    +'</div>'

    );
};